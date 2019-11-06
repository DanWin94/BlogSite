const mongoose =  require('mongoose');
const Comment  = require('../models/comments');

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    postID: mongoose.Schema.Types.ObjectId,
    createdBy: String,
    date: String,
  /*  comments: Array[{
        commentBody: String,
        commentedBy: String,
        commentID: mongoose.Schema.Types.ObjectId,
        date: String
    }]*/
});

module.exports = mongoose.model('Post', postSchema);