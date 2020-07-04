const productModel = require('../model/ProductModel');

module.exports = {
    getSanPham: (req, res, next) => {
        //số sản phẩm 1 trang
        const PAGE_SIZE = 4;
        //lấy page trên thanh địa chỉ
        let page = req.query.page;
        //nếu có page trên thanh địa chỉ
        if (page) {
            let soLuongBoQua = (page - 1) * PAGE_SIZE;
            productModel.find({})
                .skip(soLuongBoQua)
                .limit(PAGE_SIZE)
                .then(product => {
                    res.render('sanpham', {
                        product
                    })
                })
            //nếu không có mặc định cho nó là 1
        } else {
            let page = 1;
            let soLuongBoQua = (page - 1) * PAGE_SIZE;
            productModel.find({})
                .skip(soLuongBoQua)
                .limit(PAGE_SIZE)
                .then(product => {
                    res.render('sanpham', {
                        product
                    })
                })
        }
    },
    getDetailProduct: (req, res) => {
        productModel.findOne({
            _id: req.params.id
        }, (err, product) => {
            res.render('product-detail', {
                product
            })
        })
    }
    
}