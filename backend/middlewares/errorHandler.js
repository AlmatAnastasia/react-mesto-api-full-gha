const STATUS_CODES = require('../utils/costants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
        ? 'Внутренняя ошибка сервера'
        : message,
  });
  next();
};

module.exports = errorHandler;
