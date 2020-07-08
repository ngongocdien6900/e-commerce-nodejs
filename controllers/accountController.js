const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10); nếu có cái này thì nó ra false, nên để trực tiếp vào luôn
const jwt = require('jsonwebtoken');
const secret = 'NgocDien';
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
                        msg: 'Email hoặc username đã có người đăng kí',
                    })
                }
                //nếu tồn tại password
                //không tồn tại
                else {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
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
    },
    getLogin: (req, res) => {
        res.render('login');
    },
    postLogin: (req, res) => {
        //findOne giống như ID , còn find là giống class . class nó trả ra 1 mảng . Thì data[0].password
        UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if (!err && user != null) {
                bcrypt.compare(req.body.password, user.password, (err2, result) => {
                    if (result == false) {
                        res.json({
                            error: true,
                            msg: 'Sai password'
                        })
                    }
                    else {                      // 1 tuan
                        jwt.sign(user.toJSON(), secret, { expiresIn: '168h' }, (err, token) => {
                            if (err) {
                                res.json({
                                    error: true,
                                    msg: 'Token generate error ' + err
                                })
                            } else {
                                req.session.token = token;
                            }
                        })
                    }
                })
            } else {
                res.json({
                    error: true,
                    msg: 'Sai username'
                })
            }
        })
    },
}

