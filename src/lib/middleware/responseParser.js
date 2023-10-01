function formatResponseJsonMiddleware(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  if (res.body !== undefined) {
    res.write(JSON.stringify(res.body));
  } 
  next(); 
  
}

module.exports = formatResponseJsonMiddleware;
