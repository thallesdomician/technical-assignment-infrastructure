const middlewareErrorHandler = require('./errorHandler');
const { ApiError } = require('../../utils/error');

describe('middlewareErrorHandler', () => {
  test('should handle ApiError and set status code and message', () => {
    const err = new ApiError('Custom ApiError Message', 401, 'Unauthorized');
    const req = {};
    const res = {
      statusCode: 200, // Initial status code
      end: jest.fn(), // Mock the res.end method
    };
    const next = jest.fn();

    middlewareErrorHandler(err, req, res, next);

    expect(res.statusCode).toBe(401); // Status code should be set to 401
    expect(res.end).toHaveBeenCalledWith('Custom ApiError Message'); // Message should be sent to res.end
  });

  test('should handle non-ApiError and set status code to 500', () => {
    const err = new Error('Generic Error');
    const req = {};
    const res = {
      statusCode: 200, // Initial status code
      end: jest.fn(), // Mock the res.end method
    };
    const next = jest.fn();

    middlewareErrorHandler(err, req, res, next);

    expect(res.statusCode).toBe(500); // Status code should be set to 500
    expect(res.end).toHaveBeenCalledWith('Generic Error'); // Message should be sent to res.end
  });

  // Add more test cases as needed for other error types
});
