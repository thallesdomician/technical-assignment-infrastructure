const { ApiError } = require('../../../utils/error');


/**
 * Middleware for handling and responding to errors.
 * @param {Error} err - The error object.
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @param {http.ServerResponse} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
async function errorHandlerMiddleware( err, req, res, next) {
 
  if (err instanceof ApiError) {
    // If the error is an instance of ApiError, set the HTTP status code and respond with the error message or status message.
    res.statusCode = err.statusCode;
    res.write(err.message || err.statusMessage);
  } else {
    // If the error is not an instance of ApiError, set the HTTP status code to 500 (Internal Server Error) and respond with the error message or a generic error message.
    res.statusCode = 500;
    res.write(err.message || 'Internal Server Error');
  }
  
}

module.exports = errorHandlerMiddleware;
