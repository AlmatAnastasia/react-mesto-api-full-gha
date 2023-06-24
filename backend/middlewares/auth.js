const UnauthorizedError = require('../errors/Unauthorized_Error');
const { checkToken } = require('../utils/jwtAuth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
