const STATUS_CODES = require('../utils/costants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
