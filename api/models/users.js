const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    userID: String,
    email: String,
    memberID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('User', userSchema);