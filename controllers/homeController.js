const productModel = require('../model/ProductModel');
const accountModel = require('../model/UserModel');
module.exports = {
    getHome: (req, res, next) => {
        productModel.find({})
            .sort({_id: -1})
            .limit(8)
            .then(product => {
                if(req.session.userId) {
                    accountModel.findOne({
                        _id : req.session.userId
                    })
                    .then(data => {
                        res.render('index', {
                            product, data
                    })
                })
            } 
        })
    }
}
