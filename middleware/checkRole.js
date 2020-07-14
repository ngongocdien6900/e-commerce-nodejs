const accountModel = require('../model/UserModel');

module.exports = {
    checkRole : (req, res, next) => {

        accountModel.findOne({
            _id : req.session.userId
        }, (err, data) => {
            if(err) 
                throw err;
            if(data) {
                if(data.role == '1')
                    next()
                else 
                    res.redirect('/')
            }else {
                res.redirect('/')
            }    
        })
    }, 
    isLogged : (req, res, next) => {
        //tìm thằng data tồn tại
        accountModel.findOne({
            _id : req.session.userId
        })
        .then(data => {
            //gán data đó bằng biến dataUser
            dataUser = data
            loggedIn = req.session.userId;
            next();
        })
    }
}