class Status401Errors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Status401Errors;
