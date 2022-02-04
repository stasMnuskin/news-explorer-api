class Status409Errors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = Status409Errors;
