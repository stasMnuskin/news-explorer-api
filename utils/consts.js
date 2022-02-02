const { NODE_ENV, MONGO_ADDRESS } = process.env;

module.exports.mongoAddress = NODE_ENV === 'production'
  ? MONGO_ADDRESS
  : 'mongodb://localhost:27017/news';
