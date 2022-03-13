const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const Status400Errors = require('../errors/status400Errors');
const Status404Errors = require('../errors/status404Errors');
const Status409Errors = require('../errors/status409Errors');

module.exports.getUser = (req, res, next) => {
  // res.send(User);
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new Status404Errors('No user with matching ID found');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 15)
    .then((hashed) => User.create({
      password: hashed,
      email,
      name,
    }))
    .then((user) => {
      if (!user) {
        throw new Status400Errors('Wrong Data Passed');
      } else {
        res.send({
          email: user.email,
          _id: user._id,
          name: user.name,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Status404Errors('Wrong Data Passed');
      }
      if (err.name === 'MongoServerError') {
        throw new Status409Errors('Email Already Exist');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send(token);
    })
    .catch(next);
};
