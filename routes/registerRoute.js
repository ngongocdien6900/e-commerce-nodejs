const express = require('express');
const route = express.Router();
const registerController = require('../controllers/registerController');
const UserModel = require('../model/UserModel');
route.get('/', (req, res, next) => {
    UserModel.find({
        username : req.body.username
    }).then(data => {
        if(data.length == 0){
            next();
        }else {
            return res.json({
                error : 'true',
                msg : "Tài khoản đã tồn tại"
            })
        }
    })
}, registerController.register);

route.post('/', registerController.registerPost);


module.exports = route;