const { ApiError } = require('../../utils/error');

async function middlewareErrorHandler( req, res, next) {
  try {
    await next();
  } catch (err) {
    if (err instanceof ApiError) {
      res.statusCode = err.statusCode;
      res.end(err.statusMessage || err.message);
    } else {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
}

module.exports = middlewareErrorHandler;
