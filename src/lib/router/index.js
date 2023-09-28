'use strict';

const { pathToRegexp } = require('path-to-regexp');
const { NotFoundError } = require('../../utils/error');

class Router {
  constructor() {
    this.routeList = {};
  }

  addRoute(method, path, handler) {
    const keys = [];
    const regex = pathToRegexp(path, keys);

    this.routeList[method] = this.routeList[method] || [];
    this.routeList[method].push({ path, regex, keys, handler });
  }

  get(path, handler) {
    this.addRoute('GET', path, handler);
  }

  post(path, handler) {
    this.addRoute('POST', path, handler);
  }

  delete(path, handler) {
    this.addRoute('DELETE', path, handler);
  }

  put(path, handler) {
    this.addRoute('PUT', path, handler);
  }

  routes(config = { prefix: '' }) {
    const { prefix } = config;

    return (req, res, next) => {
      try {
        
      
        const method = req.method;
        const routes = this.routeList[method] || [];

        for (const route of routes) {
        
        
          if(prefix.length && !req.url.startsWith(prefix)) continue;
          const url = req.url.slice(prefix.length);
          const params = this.extractParams(url, route);
          if (route.regex.test(url)) {
            req.params = req.params || {};
            Object.assign(req.params, params);

            return route.handler(req, res, next);
          }
        }

        throw new NotFoundError('Route not found');
      } catch (error) {
        next(error);
      }
    };
  }

  extractParams(url, route) {
    const match = route.regex.exec(url);
    if (!match) {
      return {};
    }
  
    const params = {};
  
    route.keys.forEach((key, index) => {
      params[key.name] = match[index + 1];
    });
  
    return params;
  }
}

module.exports = Router;