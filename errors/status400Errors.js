class Status400Errors extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = Status400Errors;
