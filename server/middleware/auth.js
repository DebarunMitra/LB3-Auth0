// eslint-disable-next-line strict
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinuit: 5,
    jwksUri: 'https://adobot.auth0.com/.well-known/jwks.json',
  }),
  getToken: function fromHeaderOrQuerystring(req) {
    // eslint-disable-next-line max-len
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token) {
      return req.query.access_token;
    }
    return null;
  },
  audience: 'jeopardy',
  issue: 'https://adobot.auth0.com/',
  algorithm: ['RS256'],
});

module.exports = function(params) {
  return jwtCheck;
};
