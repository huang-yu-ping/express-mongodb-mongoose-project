const mongoose = require('mongoose');
const { dbUrl } = require('../config/config.default')
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
//conn error
db.on('error', (err) => {
  console.log('connect error', err)
});
//conn succes
db.once('open', function() {
  console.log('db connect success')
});

module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Artical', require('./artical'))
}