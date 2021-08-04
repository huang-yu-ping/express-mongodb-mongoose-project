//get profile

exports.getProfile = async (req, res, next) => {
    try {
        res.send('get /profiles/:username')
    } catch (err) {
        next(err)
    }
}

//follow
exports.followProfile = async (req, res, next) => {
    try {
        res.send('post /profiles/:username/follow')
    } catch (err) {
        next(err)
    }
}

//del follow

exports.delFollow = async (req, res, next) => {
    try {
        res.send('delete /profiles/:username/follow')
    } catch (err) {
        next(err)
    }
}