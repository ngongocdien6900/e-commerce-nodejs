const productModel = require('../model/ProductModel');

module.exports = {
    getHome: (req, res, next) => {
        productModel.find({})
            .sort({_id: -1})
            .limit(8)
            .then(product => {
                res.render('index', {
                    product
                })
            })
    }
}
