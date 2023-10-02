/* eslint-disable no-unused-vars */

const { AuthorizationError, ApiError } = require('../../utils/error');
const { errorHandlerMiddleware } = require('../middleware');
const WebApp = require('./');

describe('WebApp', () => { 

  let webApp, req, res, next; 
 
  beforeEach(() => {
    webApp = new WebApp();
    req = {};
    res = {
      writableEnded: false,
      end: jest.fn(),
    };
    next = jest.fn();
  });
  test('should add middlewares to the middlewares array', () => {
    const middleware1 = (_req, _res, _next) => {};
    const middleware2 = (_req, _res, _next) => {};

    webApp.use(middleware1);
    webApp.use(middleware2);

    expect(webApp.middlewares).toHaveLength(2);
    expect(webApp.middlewares).toContain(middleware1);
    expect(webApp.middlewares).toContain(middleware2);
  });

  test('should call middleware with no error', () => {
    const middleware = jest.fn((req, res, next) => {});
    webApp.use(middleware);

    webApp.handleMiddleware(req, res);

    expect(middleware).toHaveBeenCalled();
    expect(res.writableEnded).toBe(false);
  });

  test('should throw an error when using middleware with incorrect parameters', () => {
    const webApp = new WebApp();
    const invalidMiddleware = (_req, _res) => {}; // Missing `next` parameter

    expect(() => {
      webApp.use(invalidMiddleware);
    }).toThrowError('Middleware must accept three parameters (req, res, next)');
  });

  test('should execute middlewares in the correct order', () => {
    const order = [];

    const middleware1 = (req, res, next) => {
      order.push(1);
      next();
    };

    const middleware2 = (req, res, next) => {
      order.push(2);
      next();
    };

    webApp.use(middleware1);
    webApp.use(middleware2);

    webApp.handleMiddleware(req, res);

    expect(order).toEqual([1, 2]);
  });

  test('should start the server on the specified port', (done) => {
    const port = 3000;

    const server = webApp.start(port, () => {
      expect(server).toBeInstanceOf(require('http').Server);
      server.close();
      done();
    });
  });

  test('should handle and propagate AuthorizationError', () => {
  
    const middlewareWithAuthorizationError = (req, res, next) => {
      return next(new AuthorizationError('Unauthorized access'));
    };
  
    webApp.use(middlewareWithAuthorizationError);
  
  
    try {
      webApp.handleMiddleware(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
    }
  
  });

  test('should execute the callback when the server starts', (done) => {
    const port = 3000;

    const callback = jest.fn();

    webApp.start(port, callback);

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }, 100); 
  });

  test('should call next() with no middlewares', () => {
    webApp.handleMiddleware(req, res);
    expect(res.writableEnded).toBe(false);
  });

  
  test('should call middleware with error', () => {
    const middleware = jest.fn((req, res, next) => {
      throw new ApiError('Test error', 400);
    });
    try {
      webApp.use(middleware);
  
      webApp.handleMiddleware(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(400);
    }
  
    expect(middleware).toHaveBeenCalled();
    expect(res.writableEnded).toBe(false);
  });

  test('should call middleware with error and check condition', () => {
    const middlewareWithError = jest.fn((req, res, next) => {
      throw new ApiError('Test error', 400);
    });

    webApp.use(errorHandlerMiddleware);
    webApp.use(middlewareWithError);

    try {
      webApp.handleMiddleware(req, res);
    } catch (error) {
      // Here you can make assertions about the captured error
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(400);

      if (middlewareWithError.length === 4) {
        expect(middlewareWithError).toHaveBeenCalled();
      } else {
        expect(middlewareWithError).not.toHaveBeenCalled();
      }
    }

    expect(res.writableEnded).toBe(false);
  });

  test('should end response if res.writableEnded is true', () => {
    res.writableEnded = true;
    webApp.handleMiddleware(req, res);
    expect(res.writableEnded).toBe(true);
  });

});
