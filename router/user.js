const express = require('express')
const router = express.Router()
//controller
const userCtrl = require('../controller/user')
//validation
const userValidator = require('../validator/user')
//token
const auth = require('../middleware/auth');


//user login
router.post('/users/login', userValidator.login, userCtrl.login)
//user register and validate
router.post('/users', userValidator.register, userCtrl.register)


//get current user
router.get('/user', auth, userCtrl.getCurUser)

//update current user
router.put('/user', auth, userCtrl.updateCurUser)
 
module.exports = router;
