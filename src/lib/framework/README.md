## WebApp

### Overview

The `WebApp` class is a lightweight Node.js web framework designed to simplify the creation of web applications and APIs. It provides a middleware system for processing HTTP requests and responses, making it easy to add functionality such as routing, error handling, and request parsing.

### Installation

This library does not require installation as it's part of your project's codebase. You can directly import it within your project.

```javascript
const WebApp = require('./lib/framework');
```

### Usage

1. **Create an Instance of `WebApp`**

   ```javascript
   const webApp = new WebApp();
   ```

2. **Add Middleware**

   Middleware functions can be added to the `WebApp` instance using the `use` method. Middleware functions are executed in the order they are added.

   ```javascript
   webApp.use(middlewareFunction1);
   webApp.use(middlewareFunction2);
   ```

3. **Start the Server**

   Use the `start` method to start the HTTP server and specify a port. You can also provide a callback function to perform actions after the server starts.

   ```javascript
   const port = 3000;
   webApp.start(port, () => {
     console.log(`Server is running on port ${port}`);
   });
   ```

4. **Handle Middleware**

   The `handleMiddleware` method is automatically called for each incoming HTTP request. It processes the request through the added middleware functions and sends the response.

   ```javascript
   const server = http.createServer((req, res) => {
     webApp.handleMiddleware(req, res);
   });
   ```

### Example

Here's a simple example of setting up a `WebApp` instance with middleware:

```javascript
const WebApp = require('./lib/framework');
const {errorHandlerMiddleware} = require('./lib/middleware');

const webApp = new WebApp();

webApp.use(middleware1);
webApp.use(middleware2);
webApp.use(errorHandlerMiddleware);

const port = 3000;
webApp.start(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

In this example, we create a `WebApp` instance, add middleware functions, and start the server on port 3000.

## Router

### Overview

The `Router` class is a part of the `webapp` library and provides routing capabilities to handle different HTTP methods and routes. It allows you to define routes and associate request handlers with them.

### Usage

1. **Create an Instance of `Router`**

   ```javascript
   const router = new Router();
   ```

2. **Add Routes**

   Use methods like `get`, `post`, `put`, and `delete` to define routes and associate them with request handlers.

   ```javascript
   router.get('/users', getUsersHandler);
   router.post('/users', createUserHandler);
   ```

3. **Route Middleware**

   To use the `Router` as middleware in your `WebApp`, you can include it using the `use` method.

   ```javascript
   webApp.use(router.routes());
   ```

### Example

Here's a basic example of setting up a `Router` and associating routes with request handlers:

```javascript
const { Router } = require('./llib/router');

const router = new Router();

router.get('/users', (req, res) => {
  res.statusCode = 200;
  res.end('List of users');
});

router.post('/users', (req, res) => {
  res.statusCode = 201;
  res.end('User created');
});
```

In this example, we create a `Router`, define `GET` and `POST` routes, and associate them with request handlers. You can then use this `Router` as middleware within your `WebApp`.

## Middlewares

### Overview

Middleware functions are a fundamental part of the `webapp` library. They are used to process HTTP requests and responses in a modular way. You can add middleware functions to the `WebApp` instance to perform tasks such as request parsing, authentication, and error handling.

### Included Middleware

The `webapp` library includes some built-in middleware functions, including:

- `errorHandler`: Handles errors and sends appropriate HTTP responses.
- `parseRequestJsonMiddleware`: Parses JSON request bodies.

### Usage

1. **Add Middleware to `WebApp`**

   Middleware functions can be added to the `WebApp` instance using the `use` method.

   ```javascript
   const webApp = new WebApp();
   webApp.use(errorHandler);
   webApp.use(parseRequestJsonMiddleware);
   ```

2. **Create Custom Middleware**

   You can also create custom middleware functions tailored to your application's needs.

   ```javascript
   const customMiddleware = (req, res, next) => {
     // Your middleware logic here
     next();
   };
   ```

3. **Order of Execution**

   Middleware functions are executed in the order they are added to the `WebApp` instance.

### Example

Here's an example of using the built-in `errorHandler` and custom middleware in a `WebApp`:

```javascript
const { WebApp, middlewareErrorHandler, parseRequestJsonMiddleware } = require('./framework');

const webApp = new WebApp();

// Use built-in middleware
webApp.use(middlewareErrorHandler);

// Use custom middleware
webApp.use((req, res, next) => {
  console.log('Custom middleware executed');
  next();
});
```

In this example, we create a `WebApp`, add built-in and custom middleware, and demonstrate how middleware functions are executed in the order they are added.

---