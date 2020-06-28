const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10); nếu có cái này thì nó ra false, nên để trực tiếp vào luôn
const jwt = require('jsonwebtoken');
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
    getLogin : (req, res) => {
        res.render('login');
    },
    postLogin : (req, res) => {
        //findOne giống như ID , còn find là giống class . class nó trả ra 1 mảng . Thì data[0].password
        UserModel.findOne({
            username : req.body.username
        })
        .then(data => {
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if(result){
                    //tạo mã chứa thông tin , chỉ cần trả về ID 
                    // trong dấu {} , trường đầu tiền là thông tin cần mã hóa trả về cho người dùng là ID
                    // thứ 2 là mật khẩu bí mật , đặt là gì cũng được,
                    // 3 là kiểu mã hóa , nếu k để nó sẽ mặc đinh là 256 , sau đó là thời gian sống , 1d : 1 ngày , 1h 1giờ
                    let token = jwt.sign({_id : data.id}, 'ngocdien', {algorithm : 'HS256', expiresIn : "1d"})
                    res.json({
                        msg   : "Đăng nhập thành công",
                        token : token
                    })
                }
                else {
                    res.json("Lỗi cmnr")
                }
            })
        }).catch(err => {
            console.log(err);
        })
    }

    //test
    ,test : (req, res) => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY4YTQzNzFkMTQ2YzM0ZTBhODVkZjIiLCJpYXQiOjE1OTMzNTQ4NzgsImV4cCI6MTU5MzQ0MTI3OH0.gRh-B1qtaNY5XA-4FqIcrmLT8y8BPYo3r3vmHDCxYII"
        // đưa vào mã token của thằng trên và giải mã nó ra với mã bí mật
        let tokenDecode = jwt.verify(token, 'ngocdien');
        res.json(tokenDecode)
    }
}


