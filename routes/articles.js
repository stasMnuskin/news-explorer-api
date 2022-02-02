const { celebrate, Joi } = require('celebrate');
const articleRouter = require('express').Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');
// const auth = require('../middleware/auth');
// const { urlValidator } = require('../middleware/UrlValidator');

articleRouter.get('/', getArticles);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

articleRouter.delete('/:articleId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    articleId: Joi.string().hex().required(),
  }).unknown(true),
}), deleteArticle);

module.exports = articleRouter;
