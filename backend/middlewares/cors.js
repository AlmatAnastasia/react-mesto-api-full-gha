const cors = (req, res, next) => {
  const { method } = req; // сохранить тип запроса (HTTP-метод) в соответствующую переменную
  // значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // сохранить список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // установить заголовок, который разрешает браузеру запросы из любого источника
  res.header('Access-Control-Allow-Origin', '*');
  // если это предварительный запрос, добавить нужные заголовки
  if (method === 'OPTIONS') {
    // разрешить кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешить кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { cors };
