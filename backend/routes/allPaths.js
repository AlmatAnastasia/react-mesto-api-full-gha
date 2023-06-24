const router = require('express').Router();
const { getNotFound } = require('../controllers/allPaths');

// обработать неправильные пути
router.all('*', getNotFound);

module.exports = router;
