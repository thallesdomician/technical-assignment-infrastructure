
/**
 * Middleware for formatting response data as JSON and setting the 'Content-Type' header.
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @param {http.ServerResponse} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
function parseResponseJsonMiddleware(req, res, next) {
  // Set the 'Content-Type' header to 'application/json'
  res.setHeader('Content-Type', 'application/json');

  if (res.body !== undefined) {
    // Convert the response body to JSON and write it to the response
    res.write(JSON.stringify(res.body));
  } 
  next(); 
  
}

module.exports = parseResponseJsonMiddleware;
