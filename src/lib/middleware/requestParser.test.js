const {parseRequestJsonMiddleware} = require('./');
const { InternalServerError } = require('../../utils/error');

describe('parseRequestJsonMiddleware', () => {
  test('should parse JSON request body when content-type is application/json', (done) => {
    const req = {
      headers: {
        'content-type': 'application/json',
      },
      on: jest.fn(),
    };

    const res = {};
    const next = jest.fn();

    parseRequestJsonMiddleware(req, res, next);

    // Simulate data and end events
    req.on.mock.calls[0][1]('{"key": "value"}');
    req.on.mock.calls[1][1]();

    expect(req.body).toEqual({ key: 'value' });
    expect(next).toHaveBeenCalled();
    done();
  });

  test('should call next when content-type is not application/json', (done) => {
    const req = {
      headers: {
        'content-type': 'text/plain',
      },
    };

    const res = {};
    const next = jest.fn();

    parseRequestJsonMiddleware(req, res, next);

    expect(req.body).toBeUndefined();
    expect(next).toHaveBeenCalled();
    done();
  });


  test('should throw InternalServerError when JSON parsing fails', (done) => {
    const req = {
      headers: {
        'content-type': 'application/json',
      },
      on: jest.fn(),
    };

    const res = {};
    const next = jest.fn();

    try {
      parseRequestJsonMiddleware(req, res, next);

      // Simulate data and end events with invalid JSON
      req.on.mock.calls[0][1]('invalid json');
      req.on.mock.calls[1][1]();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError);
    }

    expect(req.body).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    done();
  });
});
