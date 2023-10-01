const { ApiError } = require('../../utils/error');

async function errorHandlerMiddleware( err, req, res, next) {
 
  if (err instanceof ApiError) {
    res.statusCode = err.statusCode;
    res.end(err.message || err.statusMessage);
  } else {
    res.statusCode = 500;
    res.end(err.message || 'Internal Server Error');
  }
  
}

module.exports = errorHandlerMiddleware;
