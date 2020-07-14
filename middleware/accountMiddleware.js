const secret = 'NgocDien';
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel')
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
}