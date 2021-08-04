const { User } = require('../model')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.default');

//user login
exports.login = async (req, res, next) => {
    try {
        //驗證
        //token
        const user = req.user.toJSON();
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {
            expiresIn: '1h'
        })

        delete user.password;
        res.status(200).json({
            ...user,
            token
        })

    } catch (err) {
        next(err)
    }
}
//user register
exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        //register user
        const user = new User(req.body.user)
        await user.save()

        //delete password
        // JSON.stringify(user);
        // delete user.password;
        //status
        res.status(201).json({
            user
        })
    } catch (err) {
        next(err)
    }
}

//get current user 獲取登陸用戶登陸信息
exports.getCurUser = async (req, res, next) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (err) {
        next(err)
    }
}

//update current user

exports.updateCurUser = async (req, res, next) => {
    try {
        res.send('put /user')
    } catch (err) {
        next(err)
    }
}