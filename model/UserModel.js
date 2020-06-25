const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name     : String,
    username : String,
    email    : String,
    password : String,
    address  : String,
    phone    : Number,
    role     : 0
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;