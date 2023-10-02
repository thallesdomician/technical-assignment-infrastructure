
## Middlewares

### Overview

Middleware functions are a fundamental part of the `webapp` library. They are used to process HTTP requests and responses in a modular way. You can add middleware functions to the `WebApp` instance to perform tasks such as request parsing, authentication, and error handling.

### Included Middleware

The `webapp` library includes some built-in middleware functions, including:

- `errorHandler`: Handles errors and sends appropriate HTTP responses.
- `parseRequestJsonMiddleware`: Parses JSON request bodies.
- `parseResponseJsonMiddleware`: Formats response data as JSON.

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
     // Your middleware logic here, just remember to call next middlewares using function next()
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