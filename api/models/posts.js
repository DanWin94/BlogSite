const mongoose =  require('mongoose');
const Comment  = require('../models/comments');

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    postID: mongoose.Schema.Types.ObjectId,
    createdBy: String,
    date: String,
    comments: Array[Comment]
});

module.exports = mongoose.model('Post', postSchema);