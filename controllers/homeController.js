const productModel = require('../model/ProductModel');

module.exports = {
    getHome: (req, res, next) => {
        productModel.find({})
        .limit(8)
        .then(product => {
            res.render('index', {
                product
            })
        })

    }
}

