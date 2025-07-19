export const extractJson = (text: string) => text.match(/```json([\s\S]*?)```/);

// Match anything that is json-code-block-like. Anything inside curly braces
export const extractJsonFromFallbackResponse = (text: string) =>
  text.match(/{[\s\S]*}/);
