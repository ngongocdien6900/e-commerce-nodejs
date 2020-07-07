const productModel = require('../model/ProductModel');
const ProductModel = require('../model/ProductModel');

module.exports = {
    getSanPham: (req, res, next) => {
        //số sản phẩm 1 trang
        const PAGE_SIZE = 4;
        //nếu có tìm kiếm
        if (req.query.search) {
            ProductModel.find({
                productName: new RegExp(req.query.search)
            }, (err, product) => {
                if (err) {
                    res.json({
                        error: 0,
                        msg: err
                    })
                } else {
                    let totalPage = Math.ceil(product / PAGE_SIZE);
                    res.render('sanpham', {
                        product, totalPage
                    })

                }
            })
            //nếu không có tìm thì đưa ra danh sách sp
        } else {
            //lấy page trên thanh địa chỉ
            let page = req.query.page;
            //nếu có page trên thanh địa chỉ
            if (page) {
                let soLuongBoQua = (page - 1) * PAGE_SIZE;
                productModel.find({})
                    .skip(soLuongBoQua)
                    .limit(PAGE_SIZE)
                    .then(product => {
                        productModel.countDocuments({})
                            .then(total => {
                                let totalPage = Math.ceil(total / PAGE_SIZE);
                                res.render('sanpham', {
                                    product, totalPage
                                })
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
                        productModel.countDocuments({})
                            .then(total => {
                                let totalPage = Math.ceil(total / PAGE_SIZE);
                                res.render('sanpham', {
                                    product, totalPage
                                })
                            })
                    })
            }
        }


    },
    getDetailProduct: (req, res) => {
        productModel.findOne({
            _id: req.params.id
        })
            .then(product => {
                productModel.aggregate(
                    [{ $sample: { size: 4 } }]
                )
                    .then(randomProduct => {
                        res.render('product-detail', { product, randomProduct })
                    })
            })
    }
}