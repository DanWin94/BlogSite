

const mongoose =  require('mongoose');


const commentSchema = mongoose.Schema({
    commentBody: { type: String, required: true },
    commentedBy: { type: String, required: true },
    },
     { timestamps: true },
);

module.exports = mongoose.model('Comment', commentSchema);