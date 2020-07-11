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


    }
}