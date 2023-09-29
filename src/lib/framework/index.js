'use strict';

const middlewareErrorHandler = require('../middleware/errorHandler');
const parseRequestJsonMiddleware = require('../middleware/requestParser');

class WebApp {
  constructor(handleError=true, parseJsonRequest=true) {
    this.middlewares = [];

    if(parseJsonRequest){
      this.middlewares.push(parseRequestJsonMiddleware);
    }

    if(handleError) {
      this.middlewares.push(middlewareErrorHandler);
    }

  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  start(port, callback) {
    const http = require('http');
    const server = http.createServer((req, res) => {
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

    const next = () => {
      const middleware = this.middlewares[index++];
     
      middleware(req, res, next);
      if(res.finished) return; 
      if (res.body) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const content = JSON.stringify(res.body);
        res.end(content);
      } else {
        res.end();
      }

    };

    next();
  }
}

module.exports = WebApp;
