const STATUS_CODES = require('../utils/costants');

class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICTING_REQUEST;
  }
}

module.exports = ConflictingRequestError;
