'use strict';
const http = require('http');
const {errorHandlerMiddleware} = require('../middleware');

class WebApp {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    if (middleware.length < 3 || middleware.length > 4)
      throw new Error(
        'Middleware must accept three parameters (req, res, next)'
      );
    this.middlewares.push(middleware);
    return this;
  }

  start(port, callback) {
    const server = http.createServer((req, res) => {
      this.use(errorHandlerMiddleware);
      this.handleMiddleware(req, res);
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      if (callback) {
        callback(server);
      }
    });

    return server;
  }

  handleMiddleware(req, res) {
    let index = 0;

    const next = (error) => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        try {
          if (error) {
            if (middleware.length === 4) {
              middleware(error, req, res, next);
            } else {
              next(error);
            }
          } else {

            if (middleware.length !== 4) {
              middleware(req, res, next);
            } else {
              next();
            }
          }
        } catch (err) {
          next(err);
        }
      } else {
        if (res.finished) return;
        res.end();
      }
    };

    next();
  }
}

module.exports = WebApp;
