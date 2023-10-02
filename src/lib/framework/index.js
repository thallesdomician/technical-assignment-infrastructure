'use strict';
const http = require('http');
const {errorHandlerMiddleware} = require('../middleware');

class WebApp {
  /**
   * Create a new WebApp instance.
   * @constructor
   */
  constructor() {

    /**
     * List of middlewares to be executed in order.
     * @type {function[]}
     */
    this.middlewares = [];
  }

  /**
   * Add a middleware to the application.
   * @param {function} middleware - The middleware function to add.
   */
  use(middleware) {
    if (middleware.length < 3 || middleware.length > 4)
      throw new Error(
        'Middleware must accept three parameters (req, res, next)'
      );
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * Start the web application on the specified port.
   * @param {number} port - The port to listen on.
   * @param {function} [callback] - Optional callback to be called when the server starts.
   * @returns {http.Server} - The HTTP server instance.
   */
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

  /**
   * Handle the execution of middlewares for incoming requests.
   * @param {http.IncomingMessage} req - The HTTP request object.
   * @param {http.ServerResponse} res - The HTTP response object.
   */
  handleMiddleware(req, res) {
    let index = 0;

    // Function to move to the next middleware
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
