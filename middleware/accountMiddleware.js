
module.exports = {
    validationRegister : (req, res, next) => {
        
        if(req.body.password.length < 6)
        {
            res.json({
                error : true,
                msg   : "Mật khẩu phải lớn hơn 6"
            })
        }
    
        if(req.body.password !== req.body.confirm_password) {
            res.json({
                error : true,
                msg   : "Mật khẩu không trùng"
            })
        }
        else {
            next();
        } 
     }
     , isLogin : (req, res, next) => {
        if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase === 'bearer') {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'ngocdien', (err, decode) => {
                //nếu có lỗi
                if(err)
                    return res.status(403).json({
                        msg : 'Token invalid'
                    });
                //còn không thì đi tiếp
                else 

                    res.json(decode)
            });
        }
        //không có truyền gì
        else {
            return res.status(403).json({
                msg : 'Unauthorized'
            });
        }
     }
    //,
    // validationLogin : (req, res, next) => {
    //     if(req.body.username == null || req.body.password == null)
    //     {
    //         res.json({
    //             error : true,
    //             msg   : 'Không được để trống username hoặc password'
    //         })
    //     }else {
    //         next()
    //     }
    // }
}