var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var PostSchema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now}
  });

var Post = mongoose.model('post', PostSchema)
module.exports = Post
