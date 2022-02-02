const Article = require('../models/article');
const Status400Errors = require('../errors/status400Errors');
const Status403Errors = require('../errors/status403Errors');
const Status404Errors = require('../errors/status404Errors');
// const Status401Errors = require('../errors/Status401Errors');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (articles) {
        res.send({ data: articles });
      } else {
        throw new Status404Errors('Requested resource not found');
      }
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  // console.log(req.user._id);
  const {
    keyword, title, text, date, source, link, image, owner = req.user._id,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) {
        throw new Status404Errors('Wrong Data Passed');
      }
      res.send(article);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Status400Errors('Invalid URL');
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new Status404Errors('No Article To Delete');
      }
      if (article.owner.toString() === req.user._id.toString()) {
        Article.deleteOne(article).then(() => {
          res.status(200).send(article);
        });
      } else {
        throw new Status403Errors('You Are Not Authorized');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new Status400Errors('Invalid Id');
      }
    })
    .catch(next);
};
