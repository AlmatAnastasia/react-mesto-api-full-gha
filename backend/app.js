const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1/mestodb' } = process.env;
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
// защита приложения от некоторых веб-уязвимостей
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(DB_ADDRESS);

const app = express();
app.use(cors);
app.use(express.json());
app.use(requestLogger); // подключить логгер запросов

app.use(limiter);
app.use(helmet());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use(errorLogger); // подключить логгер ошибок
router.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен по порту 3000');
});
