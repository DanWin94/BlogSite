const mongoose =  require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    postID: mongoose.Schema.Types.ObjectId,
    createdBy: String,
    date: String
});

module.exports = mongoose.model('Post', postSchema);