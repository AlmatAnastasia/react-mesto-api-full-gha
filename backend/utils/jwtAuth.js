const { NODE_ENV = 'production', JWT_SECRET = 'JWT_SECRET' } = process.env;
const jwt = require('jsonwebtoken');

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const checkToken = (token) => jwt.verify(token, SECRET_KEY);

const signToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

module.exports = {
  checkToken,
  signToken,
};
