class Status404Errors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = Status404Errors;
