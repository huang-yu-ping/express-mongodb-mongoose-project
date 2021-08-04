const { Article, User } = require('../model')

//list article
exports.getArticleList = async (req, res, next) => {
    try {
        const { limit, offset, tag, author } = req.query;
        const filter = {}
        if(tag) {
            filter.tagList = tag
        }

        if(author) {
            const user = await User.findOne({ username: author });
            filter.author = user ? user._id : null
        }

        const article = await Article
                                 .find(filter)
                                 .skip(Number.parseInt(offset))
                                 .limit(Number.parseInt(limit))
                                 .sort({ createdAt: -1 })
        const articlesCount = await Article.countDocuments()
        res.status(200).json({
            article,
            articlesCount
        })
    } catch (err) {
        next(err)
    }
}
//get feed article
exports.getFeedArticle = async (req, res, next) => {
    try {
        res.send('get /feed')
    } catch (err) {
        next(err)
    }
}
//get article
exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId).populate('author')
        if(!article) {
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//create article
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id

        article.populate('author').execPopulate()

        await article.save()
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//update article
exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article;
        console.log(article);
        const updatedArticle = req.body.article;
        article.title = updatedArticle.title || article.title;
        article.description = updatedArticle.description || article.description;
        article.body = updatedArticle.body || article.body;
        
        await article.save()
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//delete article
exports.delArticle = async (req, res, next) => {
    try {
        const article = req.article;
        await article.remove()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}
//add comments to an article
exports.addComments = async (req, res, next) => {
    try {
        res.send('post /:slug/comments')
    } catch (err) {
        next(err)
    }
}
//get comments from an article
exports.getComments = async (req, res, next) => {
    try {
        res.send('get /:slug/comments')
    } catch (err) {
        next(err)
    }
}
//del comments
exports.delComments = async (req, res, next) => {
    try {
        res.send('delete /:slug/comments/:id')
    } catch (err) {
        next(err)
    }
}
//favorite article
exports.favoriteArticle = async (req, res, next) => {
    try {
        res.send('post /:slug/favorite')
    } catch (err) {
        next(err)
    }
}

//unfavorite article
exports.unfavoriteAricle = async (req, res, next) => {
    try {
        res.send('delete /:slug/favorite')
    } catch (err) {
        next(err)
    }
}


