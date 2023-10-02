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
