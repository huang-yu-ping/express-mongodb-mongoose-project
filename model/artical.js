const mongoose = require('mongoose')
const baseModel = require('./base-model');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    tagList: {
      type: [String],
      default: null
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    ...baseModel
  })

  /*
* {
  "user":{
  "username": "Jacob",
  "email": "jake@jake.jake",
  "password": "jakejake"
   }
}*/

module.exports = articleSchema;