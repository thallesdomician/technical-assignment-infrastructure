const { InternalServerError } = require('../../utils/error');


function parseRequestJsonMiddleware(req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    let data = '';
    
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        if(data) {
          req.body = JSON.parse(data);
        }
      } catch (error) {
        throw new InternalServerError();
      }
    });
  }
  next();
  
}

module.exports = parseRequestJsonMiddleware;