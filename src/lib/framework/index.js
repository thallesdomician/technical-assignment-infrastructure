'use strict';

class WebApp {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}

module.exports = WebApp;