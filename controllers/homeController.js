const productModel = require('../model/ProductModel');

module.exports = {
    getHome: (req, res, next) => {
        productModel.find({})
        .limit(10)
        .then(product => {
            res.render('index', {
                product
            })
        })

    }
}

