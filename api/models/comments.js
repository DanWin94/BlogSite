const mongoose =  require('mongoose');

const commentSchema = mongoose.Schema({
    commentBody: String,
    commentedBy: String,
    commentID: mongoose.Schema.Types.ObjectId,
    date: String
});

module.exports = mongoose.model('Comment', commentSchema);