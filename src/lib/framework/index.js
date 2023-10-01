'use strict';
const http = require('http');
const middlewareErrorHandler = require('../middleware/errorHandler');

class WebApp {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  start(port, callback) {
    const server = http.createServer((req, res) => {
      this.use(middlewareErrorHandler);
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
          // Chama o middleware e passa o erro como argumento, se existir
          if (error) {
            if (middleware.length === 4) {
              // Se o middleware tem 4 parâmetros, é um middleware de erro
              middleware(error, req, res, next);
            } else {
              // Se não, é um middleware comum, então pule e chame o próximo
              next(error);
            }
          } else {
            // Chama o middleware normalmente

            if (middleware.length !== 4) {
              middleware(req, res, next);
            }
            else{
              next();
            }
          }
        } catch (err) {
          // Captura erros lançados pelo middleware
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
