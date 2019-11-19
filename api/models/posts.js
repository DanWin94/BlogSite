const mongoose =  require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },

    Tags:{
        tagValue: {type: [String], required: false}
    },
    Category: {
        type: [String],
        required: true,
        enum: ['cat1', 'cat2', 'cat3', 'cat4','cat5']
    }

},
    { timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);