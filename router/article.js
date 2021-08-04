const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/article')
//auth
const auth = require('../middleware/auth');
//validator / article id
const articleValidator = require('../validator/article');
 


//list article
router.get('/', articleCtrl.getArticleList)

//get feed article
router.get('/feed', articleCtrl.getFeedArticle)

//get article
router.get('/:articleId', articleValidator.getArticle, articleCtrl.getArticle)

//create article
router.post('/', auth, articleValidator.createArticle, articleCtrl.createArticle)

//update article
router.put('/:articleId', auth, articleValidator.updateAricle, articleCtrl.updateArticle)

//delete article
router.delete('/:articleId', auth, articleValidator.deleteAricle, articleCtrl.delArticle)

//add comments to an article
router.post('/:articleId/comments', articleCtrl.delComments)

//get comments from an article
router.get('/:articleId/comments', articleCtrl.getComments)

//del comments
router.delete('/:articleId/comments/:id', articleCtrl.delComments)

//favorite article
router.post('/:articleId/favorite', articleCtrl.favoriteArticle)

//unfavorite article
router.delete('/:articleId/favorite', articleCtrl.unfavoriteAricle)

module.exports = router