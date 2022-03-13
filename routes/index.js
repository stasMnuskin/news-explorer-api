const appRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const Status404Errors = require('../errors/status404Errors');
const articlesRouter = require('./articles');
const userRouter = require('./users');
const auth = require('../middleware/auth');

appRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    // email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

appRouter.use('/articles', auth, articlesRouter);
appRouter.use('/users', auth, userRouter);

// eslint-disable-next-line no-unused-vars
appRouter.get('*', (req, res) => {
  throw new Status404Errors('Requested resource not found');
});

module.exports = appRouter;
