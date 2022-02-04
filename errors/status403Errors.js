class Status403Errors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Status403Errors;
