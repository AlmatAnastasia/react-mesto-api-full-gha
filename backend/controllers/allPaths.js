const NotFoundError = require('../errors/Not_Found_Error');

// обработать неправильные пути
const getNotFound = () => {
  throw new NotFoundError('Путь не найден');
};

module.exports = { getNotFound };
