const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name     : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email    : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    address  : {
        type : String,
        required : true
    },
    phone    : {
        type : String,
        required : true
    },
    role     : {
        type : String,
        default : 0
    }
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;