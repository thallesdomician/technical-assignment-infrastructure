const parseResponseJsonMiddleware = require('.');


describe('parseResponseJsonMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      setHeader: jest.fn(),
      write: jest.fn(),
    };
    next = jest.fn();
  });

  test('should set Content-Type header to application/json', () => {
    parseResponseJsonMiddleware(req, res, next);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
  });

  test('should write JSON response if res.body is defined', () => {
    res.body = { key: 'value' };
    parseResponseJsonMiddleware(req, res, next);
    expect(res.write).toHaveBeenCalledWith(JSON.stringify(res.body));
  });

  test('should not write JSON response if res.body is undefined', () => {
    parseResponseJsonMiddleware(req, res, next);
    expect(res.write).not.toHaveBeenCalled();
  });

  test('should call next()', () => {
    parseResponseJsonMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
