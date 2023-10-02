/**
 *  Application definition - do not modify this code
 * ==================================================
 *
 * You are only allowed to comment out unimplemented sections of this code for testing purposes.
 * TODO comments specify what needs to be implemented.
 */

const WebApp = require('./lib/framework');
const { parseRequestJsonMiddleware, parseResponseJsonMiddleware } = require('./lib/middleware');
const auth = require('./middleware/auth');
const documentRoutes = require('./routes/documentRoutes');

// TODO: implement a constructor [1]
const app = new WebApp();

// middleware parse request and response json is provided out-of-th box by the webapp lib, although each developer should decide when it will used
// app.use(parseRequestJsonMiddleware);

// TODO: implement the 'use' method which registers the global application middleware (ie. auth middleware, routers, etc.) [2]
app.use(auth);
// TODO: router should implement the 'routes' method which builds the routing middleware [9]
app.use(documentRoutes.routes({ prefix: '/documents' }));
// app.use(parseResponseJsonMiddleware);


if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
else {
  // TODO: implement 'start' method which returns node's http server instance [3]
  const server = app.start(3000);

  server.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
}
