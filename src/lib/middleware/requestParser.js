const { InternalServerError } = require('../../utils/error');


function parseRequestJsonMiddleware(req, res, next) {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    let data = '';
    
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
        next();
      } catch (error) {
        throw new InternalServerError();
      }
    });
  } else {
    next();
  }
}

module.exports = parseRequestJsonMiddleware;