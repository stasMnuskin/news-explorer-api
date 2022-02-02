const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Status401Errors = require('../errors/status401Errors');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Status401Errors('Authorization Is Required!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new Status401Errors('Authorization Is Required!');
  }

  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
};
