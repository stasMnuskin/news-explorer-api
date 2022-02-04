const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { getUser } = require('../controllers/users');

userRouter.get(
  '/me',
  celebrate({
    body: Joi.object().keys({
      user: Joi.object().keys({
        _id: Joi.string().required().hex(),
      }).unknown(true),
    }).unknown(true),
  }),
  getUser,
);

module.exports = userRouter;
