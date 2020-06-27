const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = {
    getRegister: (req, res) => {
        res.render('register')
    },
    postRegister: (req, res) => {
        //tìm username với email trên database
        UserModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
            .then(data => {
                //nếu tồn tại email
                if (data) {
                    res.json({
                        error: true,
                        msg: 'Email đã tồn tại',
                    })
                }
                //nếu tồn tại password
                //không tồn tại
                else {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        return UserModel.create({
                            name: req.body.name,
                            email: req.body.email,
                            username: req.body.username,
                            password: hash, // password bây giờ sẽ bằng đoạn mã hóa 
                            address: req.body.address,
                            phone: req.body.phone
                        })
                        .then(data => {
                            res.redirect('/account/login')
                        })
                    })
                } 
            })
            .catch(err => {
                res.json({
                    error: true,
                    msg: 'Tạo tài khoản thất bại'
                })
                // res.status(error.response.status)
                // return res.send(error.message);
            })
    }
}


