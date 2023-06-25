// ограничение кол-ва запросов (защита от DoS-атак)
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // "окно" - 15 минут
  max: 100, // ограничить каждый IP-адрес 100 запросами за "окно" (за 15 минут)
});

module.exports = limiter;
