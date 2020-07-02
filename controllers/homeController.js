const productModel = require('../model/ProductModel');

module.exports = {
    getHome : (req, res, next) => {
        productModel.find({}).then(product => {
            res.render('index', {
                product
            })
        })
    }
}