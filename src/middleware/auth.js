/**
 *  Definition of dummy auth middleware - do not modify this code
 * ===============================================================
 *
 * You are only allowed to comment out unimplemented sections of this code for testing purposes.
 */

/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('http').ServerResponse} ServerResponse
 */

/**
 * Dummy auth middleware - checks if authorization header is set to any value
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
module.exports = function authMiddleware(req, res, next) {
  const authorization = req.headers?.authorization;
  if (!authorization) {
    res.body = 'unauthorized';
    return; // <-- blocks the execution of any subsequent middleware in stack (no call of `next()`). Unauthorized calls shouldn't even reach the route handler.
  }

  next(); // <-- calls the next middleware. In this case, it will be the routing middleware.
  // <-- any additional code under the `next()` function, if present, should be executed *after* the routing middleware execution is done.
};
