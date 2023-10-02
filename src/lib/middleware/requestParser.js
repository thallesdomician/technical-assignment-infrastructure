const { InternalServerError } = require('../../utils/error');


/**
 * Middleware for parsing JSON data from incoming requests with 'application/json' content type.
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @param {http.ServerResponse} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @throws {InternalServerError} If there's an error parsing JSON data.
 * @returns {void}
 */
function parseRequestJsonMiddleware(req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    let data = '';

    req
      .on('data', (chunk) => {
        data += chunk;
      });
    req .on('end', () => {
      try {
        if (data) {
          req.body = JSON.parse(data);
        }
      } catch (error) {
        // If there's an error parsing JSON data, throw an InternalServerError
        throw new InternalServerError('Error: parse JSON data');
      }
      next();
    });
  } else {
    // If the content type is not 'application/json', continue to the next middleware
    next();
  }
}

module.exports = parseRequestJsonMiddleware;
