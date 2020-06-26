const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = {
    getRegister: (req, res) => {
        res.render('register')
    },
    postRegister: (req, res, next) => {
        // UserModel.findOne({
        //     $or : [
        //         {username : req.body.username},
        //         {email    : req.body.email}
        //     ]}).then(data => {
        //     if(data.email) {
        //         res.json({
        //             error : true,
        //             msg   : 'Email đã tồn tại'
        //         })
        //     }
        //     if(data.username) {
        //         res.json({
        //             error : true,
        //             msg   : 'Username đã tồn tại'
        //         })
        //     }
        // })
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            UserModel.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash, // password bây giờ sẽ bằng đoạn mã hóa 
                address: req.body.address,
                phone: req.body.phone
            }).then(data => {
                if(data) {
                    res.redirect('/account/login')
                }
                else {
                    res.json({
                        error : true,
                        msg   : "Đăng kí thất bại"
                    })
                }
            })
        });
    }
}


