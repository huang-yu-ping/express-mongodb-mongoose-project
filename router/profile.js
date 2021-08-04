const express = require('express')
const router = express.Router()
//controller
const profileCtrl = require('../controller/profile')
//get profile
router.get('/profiles/:username', profileCtrl.getProfile)

//follow
router.post('/profiles/:username/follow', profileCtrl.followProfile)

//del follow
router.delete('/profiles/:username/follow', profileCtrl.getProfile)



module.exports = router;