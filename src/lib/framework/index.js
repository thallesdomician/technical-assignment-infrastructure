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
    let responseEnded = false;

    const next = async () => {
      const middleware = this.middlewares[index++];
     
      await middleware(req, res, next);
      if(responseEnded) return; 
      if (res.body) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const content = JSON.stringify(res.body);
        res.end(content);
      } else {
        res.end();
      }
      responseEnded = true;

    };

    next();
  }
}

module.exports = WebApp;
