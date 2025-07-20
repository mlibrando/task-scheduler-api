import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GroqChatCompletionResponse, ParsedTask } from './groq.types';
import { extractJson, extractJsonFromFallbackResponse } from 'src/utils/regex';

@Injectable()
export class GroqService {
  private readonly apiKey = process.env.GROQ_API_KEY;
  private readonly endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  async parseTaskPrompt(prompt: string): Promise<ParsedTask> {
    const date = new Date();
    const systemPrompt = `You are a task parsing assistant. For additional context the current date time in ISO is ${date.toISOString()}. If there is an absence of a date or time just set the due_date as null. Convert user input into JSON with fields: title, description, due_date (in ISO 8601 format).`;

    const response = await axios.post<GroqChatCompletionResponse>(
      this.endpoint,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const message = response.data.choices[0].message.content;
    const blockMatch = extractJson(message);
    const fallbackMatch = extractJsonFromFallbackResponse(message);

    const jsonString = blockMatch?.[1] || fallbackMatch?.[0];

    if (!jsonString) {
      throw new Error(`Failed to extract JSON from Groq response: ${message}`);
    }
    try {
      console.log({ message });
      const parsed = JSON.parse(jsonString.trim()) as ParsedTask;
      return parsed;
    } catch (err) {
      console.log(err);
      throw new Error(
        `JSON parsing error: ${(err as Error).message}. Raw: ${jsonString}`,
      );
    }
  }
}
