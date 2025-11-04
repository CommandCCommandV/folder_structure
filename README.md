# folder_structure

You are given a simple codebase, where the logic is written in the index.js file. Although this approach works just fine, as the project scales, this code becomes less maintainable and less testable. To tackle this, let's break this project down into the following architecture.


```
.
├── db/
│   └── config.js
├── src/
│   ├── users/
│   │   ├── controllers.js
│   │   ├── services.js
│   │   ├── middlewares.js
│   │   └── routes.js
│   └── index.js
├── package.json
├── .env
└── schema.prisma
```


Here's a brief overview of each folder/file:
- db/: This folder contains the database configuration file (config.js) where we set up the database connection using Prisma.
- src/: This is the main source folder for our application code.
    - users/: This subfolder contains all the user-related logic, divided into:
        - controllers.js: Handles incoming requests and responses.
        - services.js: Contains the business logic related to users.
        - middlewares.js: Contains middleware functions for user routes.
        - routes.js: Defines the user-related API endpoints.
    - index.js: The main entry point of the application where we set up the Express server and integrate routes.
- package.json: Contains project metadata and dependencies.
- .env: Stores environment variables like database connection strings and server port.  



# 🧩 User Module Structure

This module follows a clear separation of concerns — each file handles a specific responsibility in the user flow.  
It ensures your controller stays clean, business logic is separated, and validation happens early.

---

## ⚙️ **services.js**

### Responsibilities
- Contains a function named `createUser` that handles business logic and interacts with the database.
- Uses Prisma methods for database operations.

### Behavior
- Checks if a user with the given email already exists using `prisma.user.findUnique`.
- If the user does not exist, creates a new user using `prisma.user.create`.
- The function is called as:  
  `createUser({ name, email })`
- Returns the newly created user object.

> This separation of database logic keeps your controller clean and focused on request/response handling.

---

## 🧩 **middlewares.js**

### Responsibilities
- Contains a middleware function called `validationMiddleware` that validates incoming request data before passing it to the controller.

### Behavior
- Extracts `email` and `name` from the request body.
- Performs input validation:
  - Checks if `email` is a non-empty string and contains an `"@"`.
  - Checks if `name` is a non-empty string.
- If validation fails, it returns a **400 Bad Request** with one of the following messages:
  - `res.status(400).json({ err: "Valid email is required." })`
  - `res.status(400).json({ err: "Valid name is required." })`
- If validation passes, it calls `next()` to forward the request to the controller.

> This ensures invalid requests are rejected early before hitting the business logic.

---

## 🚏 **routes.js**

### Responsibilities
- Defines the route handlers for the users resource and connects middleware with controllers.

### Behavior
- Imports:
  - `express`
  - `validationMiddleware`
  - `create` controller
- Creates a new Router instance: `usersRoutes`.
- Defines a **POST /** route that:
  - Runs `validationMiddleware` to validate incoming data.
  - Then calls the `create` controller to handle the logic.
- Exports `usersRoutes` so it can be mounted in `index.js`.

> This file connects the middleware and controller layers for the endpoint.

---

## 🧠 **controllers.js**

### Responsibilities
- Handles the incoming HTTP request and sends the appropriate response.
- Imports the `createUser` function from `services.js`, which contains the business/database logic.

### Behavior
- The `create` function is an async controller that:
  - Extracts `email` and `name` from the request body.
  - Calls `createUser({ name, email })` from the service layer.
  - If successful, sends a **200 OK** response with the created user data.
  - If the user already exists, sends a **409 Conflict** with the following error:
    - `res.status(409).json({ err: "User already exists." })`

> This file keeps request–response logic clean and delegates database operations to the service layer.

---
With this structure, each part of the user flow is clearly separated, making the codebase more maintainable and testable as it grows.

