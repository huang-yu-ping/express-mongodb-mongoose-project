const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const profileRouter = require('./profile');
const articleRouter = require('./article');
const tagRouter = require('./tag')
//user
router.use(userRouter)
router.use(profileRouter)
router.use('/articles', articleRouter)
router.use(tagRouter)



module.exports = router;