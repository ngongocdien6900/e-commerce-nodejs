const productModel = require('../model/ProductModel');

module.exports = {
    getHome: (req, res, next) => {
        productModel.findOne({
            _id: req.params.id
        })
        .then(product => {
                productModel.aggregate(
                    [{ $sample: { size: 8 } }]
                )
                    .then(randomProduct => {
                        res.render('index', { product, randomProduct })
                    })
            })
            
    }
}