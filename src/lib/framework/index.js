'use strict';


class WebApp {
  constructor() {
    this.middlewares = [];
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
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next);
      } else {
        if(res.finished) return; 
        res.end();
      }

    };

    next();
  }
}

module.exports = WebApp;
