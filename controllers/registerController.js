const UserModel = require('../model/UserModel');

module.exports.register = (req, res, next) => {
    res.render('register');
}

module.exports.registerPost = (req, res, next) => {
    UserModel.create({
        name     : req.body.name,
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password,
        address  : req.body.address,
        phone    : req.body.phone
    }).then(() => {
        return res.json({
            error : "false",
            msg : "Đăng kí thành công"
        })
        
    })
}