# Task Scheduler API

A simple task scheduling API built with NestJS, Prisma, and JWT authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mlibrando/task-scheduler-api
   cd task-scheduler-api
2. Install dependencies:
   ```bash
   npm install
3. Generate the Prisma client:
   ```bash
   npx prisma generate
4. Start the development server:
   ```bash
   npm run start:dev

## API Endpoints
## Use Postman or a similar tool to test the following endpoints.

## Auth
* POST /api/register


  Body:
  {
  "user_name": "your_username",
  "password": "your_password"
  }

* POST /api/login


  Body:
  {
  "username": "michael",
  "password": "your_password"
  }


  Response:
  {
  "access_token": "<jwt_token>",
  "due_tasks": "<array_of_tasks_due_for_today>"
  }

## Tasks (Protected with JWT) 
Ensure that Authorization: Bearer <jwt_token> from login response is copied and pasted
* Get All Tasks - GET /api/tasks?take=10&cursor=0
  
* Get Tasks Due Today - GET /api/tasks/due
  
* Add Task - POST /api/tasks/add


  Body:
  {
  "prompt": "Finish the NestJS documentation by 6PM"
  }

* Edit Task - PATCH /api/tasks/edit/:id


  Body:
  {
    "title": "Edited title",
    "description": "Cerals breads?",
    "due_date": "2025-07-20T06:17:35"
  }
* Delete Task - DELETE /api/tasks/delete/:id
* Mark Task as Completed - PATCH /api/tasks/mark-complete/:id
* Mark Task as Uncompleted - PATCH /api/tasks/mark-uncomplete/:id
  

  


  
