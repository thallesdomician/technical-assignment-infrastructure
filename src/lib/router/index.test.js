
const Router = require('./');

describe('Router', () => {

  let router;

  beforeEach(() => {
    router = new Router();
  });
  
  test('should add a route', () => {
    
    const handler = jest.fn();
    router.addRoute('GET', '/test', handler);
      
    expect(router.routeList['GET']).toHaveLength(1);
    expect(router.routeList['GET'][0].path).toBe('/test');
    expect(router.routeList['GET'][0].handler).toBe(handler);
  });

  test('should execute route handler', () => {
    
    const handler = jest.fn();
    router.get('/test', handler);
  
    const req = { method: 'GET', url: '/test' };
    const res = {};
    const next = jest.fn();
    const routesMiddleware = router.routes();
  
    routesMiddleware(req, res, next);
  
    expect(handler).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should not execute route with incorrect prefix', () => {
    
    const handler = jest.fn();
    router.get('/admin/dashboard', handler);
  
    const req = { method: 'GET', url: '/user/dashboard' };
    const res = {};
    const next = jest.fn();
    const routesMiddleware = router.routes({ prefix: '/admin' });
  
    routesMiddleware(req, res, next);
  
    expect(handler).not.toHaveBeenCalled();
  });

  test('should extract route parameters', () => {
    

    // Define a route with a parameter
    router.get('/user/:id', (req, res) => {});

    // Simulate a URL with a parameter
    const url = '/user/123';

    // Get the route and parameters
    const route = router.routeList['GET'][0];
    const params = router.extractParams(url, route);

    // Expect the extracted parameter to be correct
    expect(params).toEqual({ id: '123' });
  });

  test('should handle no route parameters', () => {
    

    // Define a route with no parameters
    router.get('/users', (req, res) => {});

    // Simulate a URL with no parameters
    const url = '/users';

    // Get the route and parameters
    const route = router.routeList['GET'][0];
    const params = router.extractParams(url, route);

    // Expect an empty object for parameters
    expect(params).toEqual({});
  });

  test('should handle no match for route parameters', () => {
    
  
    // Define a route with a parameter
    router.get('/user/:id', (req, res) => {});
  
    // Simulate a URL that does not match the route
    const url = '/users';
  
    // Get the route and parameters
    const route = router.routeList['GET'][0];
    const params = router.extractParams(url, route);
  
    // Expect an empty object for parameters
    expect(params).toEqual({});
  });

  test('should handle POST route', () => {
    const handler = jest.fn((req, res) => {
      res.statusCode = 201;
      res.end('POST route handled');
    });

    router.post('/test', handler);

    const req = { method: 'POST', url: '/test' };
    const res = {};
    const next = jest.fn();
    const routesMiddleware = router.routes();

    routesMiddleware(req, res, next);

    expect(handler).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
  });

  test('should handle PUT route', () => {
    const handler = jest.fn((req, res) => {
      res.statusCode = 200;
      res.end('PUT route handled');
    });

    router.put('/test', handler);

    const req = { method: 'PUT', url: '/test' };
    const res = {};
    const next = jest.fn();
    const routesMiddleware = router.routes();

    routesMiddleware(req, res, next);

    expect(handler).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('should handle DELETE route', () => {
    const handler = jest.fn((req, res) => {
      res.statusCode = 204;
      res.end();
    });

    router.delete('/test', handler);

    const req = { method: 'DELETE', url: '/test' };
    const res = {};
    const next = jest.fn();
    const routesMiddleware = router.routes();

    routesMiddleware(req, res, next);

    expect(handler).toHaveBeenCalled();
    expect(res.statusCode).toBe(204);
    expect(res.body).toBeUndefined();
  });
});
