'use strict';

const { pathToRegexp } = require('path-to-regexp');

class Router {
  /**
   * Create a new Router instance.
   * @constructor
   */
  constructor() {
    /**
     * List of route definitions.
     * @type {Object}
     */
    this.routeList = {};
  }


  /**
 * Add a route definition for a specific HTTP method.
 * @param {string} method - The HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {string} path - The route path.
 * @param {function} handler - The handler function for the route.
 */
  addRoute(method, path, handler) {
    const keys = [];
    const regex = pathToRegexp(path, keys);

    this.routeList[method] = this.routeList[method] || [];
    this.routeList[method].push({ path, regex, keys, handler });
    return this;
  }
  /**
 * Add a route definition for the GET HTTP method.
 * @param {string} path - The route path.
 * @param {function} handler - The handler function for the route.
 * @returns {Router} - The current Router instance.
 */
  get(path, handler) {
    return this.addRoute('GET', path, handler);
  }

  /**
 * Add a route definition for the POST HTTP method.
 * @param {string} path - The route path.
 * @param {function} handler - The handler function for the route.
 * @returns {Router} - The current Router instance.
 */
  post(path, handler) {
    return this.addRoute('POST', path, handler);
  }

  /**
 * Add a route definition for the PUT HTTP method.
 * @param {string} path - The route path.
 * @param {function} handler - The handler function for the route.
 * @returns {Router} - The current Router instance.
 */
  put(path, handler) {
    return this.addRoute('PUT', path, handler);
  }

  /**
 * Add a route definition for the DELETE HTTP method.
 * @param {string} path - The route path.
 * @param {function} handler - The handler function for the route.
 * @returns {Router} - The current Router instance.
 */
  delete(path, handler) {
    return this.addRoute('DELETE', path, handler);
  }

  /**
   * Generate routes middleware based on route definitions.
   * @param {Object} config - Configuration options for the routes.
   * @param {string} [config.prefix] - A common prefix for all routes.
   * @returns {function} - The middleware function for handling routes.
   */
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
            route.handler(req, res);
            next();
          }
        }

      } catch (error) {
        next(error);
      }

    };
  }

  /**
   * Extract route parameters from a URL based on a route definition.
   * @param {string} url - The URL to extract parameters from.
   * @param {Object} route - The route definition.
   * @returns {Object} - An object containing extracted parameters.
   */
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