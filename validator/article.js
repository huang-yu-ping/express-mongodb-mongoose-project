const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose');
const { Article } = require('../model')


exports.createArticle = validate([
    body('article.title')
      .notEmpty()
      .withMessage('文章標題不能為空'),
    body('article.description')
      .notEmpty()
      .withMessage('文章摘要不能為空'),
    body('article.body')
      .notEmpty()
      .withMessage('文章內容不能為空'),
])

exports.getArticle = validate([
    param('articleId').custom(async value => {
        if(!mongoose.isValidObjectId(value)) {
            return Promise.reject('文章id類型錯誤')
        }
    })
])

exports.updateAricle = [
  validate([
    param('articleId').custom(async value => {
        if(!mongoose.isValidObjectId(value)) {
            return Promise.reject('文章id類型無效')
        }
    })
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    //author: 60e145ad615a4d26506122b8
    req.article = article
    if(!article) {
      return res.status(404).end()
    }
    next()
  },
  async (req, res, next) => {
     console.log(req.user._id);//60e145ad615a4d26506122b8
     console.log(req.article.author);
     if(req.user._id.toString() !== req.article.author.toString()) {
       return res.status(403).end()
     }
     next()
  }
]


exports.deleteAricle = [
  validate([
    param('articleId').custom(async value => {
        if(!mongoose.isValidObjectId(value)) {
            return Promise.reject('刪除文章id類型無效')
        }
    })
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    //author: 60e145ad615a4d26506122b8
    req.article = article
    if(!article) {
      return res.status(404).end()
    }
    next()
  },
  async (req, res, next) => {
     
     if(req.user._id.toString() !== req.article.author.toString()) {
       return res.status(403).end()
     }
     next()
  }
]


  


