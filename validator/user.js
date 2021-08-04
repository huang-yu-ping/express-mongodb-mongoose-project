const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { User } = require('../model')
const md5 = require('../util/md5');
//user register validator
exports.register = validate([
    body('user.username')
      .notEmpty()
      .withMessage('用戶名不能空')
      .custom(async username => {
        const user = await User.findOne({ username })
        if(user) {
            return Promise.reject('username已存在')
        }
      }),
    body('user.password')
      .notEmpty()
      .withMessage('用戶密碼不能空')
      .isLength({ min: 6 })
      .withMessage('用戶密碼不可少於六位數')
      .isLength({ max: 10 })
      .withMessage('用戶密碼不可高於六位數'),
    body('user.email')
      .notEmpty()
      .withMessage('用戶email不能空')
      .bail()
      .custom(async email => {
          const user = await User.findOne({ email })
          if(user) {
              return Promise.reject('email已存在')
          }
      }),
])

//user login validator
exports.login = [
  validate([
    body('user.email')
    .notEmpty()
    .withMessage('用戶email不能空'),
    body('user.password')
    .notEmpty()
    .withMessage('用戶password不能空')
    
  ]),
  validate([
    body('user.email')
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email }).select(['email', 'username', 'bio', 'image', 'password'])
        if(!user) {
          return Promise.reject('用戶不存在')
        }
  
        req.user = user
      })
  ]),
  validate([
    body('user.password')
      .custom(async (password, { req }) => {
        console.log(req.user)
        if(md5(password) !== req.user.password) {
          return Promise.reject('密碼錯誤')
        }
  
      })
  ])
]