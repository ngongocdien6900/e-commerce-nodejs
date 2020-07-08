const productModel = require('../model/ProductModel');
const categoryModel = require('../model/CategoryModel');
module.exports = {
    getSanPham: async (req, res, next) => {
        //số sản phẩm 1 trang
        const PAGE_SIZE = 8;

        //nếu có tìm kiếm
        if (req.query.search) {
            productModel.find({
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
                        product
                    })

                }
            })
        } else {
            try {
                // lấy page truyền trên thanh địa chỉ
                let page = req.query.page;
                //nếu có page truyền lên thì lấy giá trị đó. K có thì mặc định là 1
                page ? req.query.page : page = 1
                let skip = (page - 1) * PAGE_SIZE;
                let product = await productModel.find({}) 
                .skip(skip)
                .limit(PAGE_SIZE)
                let totalPage = await productModel.countDocuments({})
                totalPage = Math.ceil(totalPage / PAGE_SIZE)
                let category = await categoryModel.aggregate([{
                    $lookup: {
                        //nhu ten db ben kia
                        from: "product",
                        localField: "products",
                        foreignField: "_id",
                        as: "listCategory"
                    }
                }])
                res.render('sanpham', {
                    product, category, totalPage
                })
            }catch(err ) {
                res.json(err)
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

let a = () => {
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
                        categoryModel.aggregate([{
                            $lookup: {
                                //nhu ten db ben kia
                                from: "product",
                                localField: "products",
                                foreignField: "_id",
                                as: "listCategory"
                            }
                        }], (err, category) => {
                            if (err) {
                                res.json({
                                    error: 0,
                                    msg: err
                                })
                            } else {
                                res.render('sanpham', {
                                    product, totalPage, category
                                })
                            }
                        });
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
                        categoryModel.aggregate([{
                            $lookup: {
                                //nhu ten db ben kia
                                from: "product",
                                localField: "products",
                                foreignField: "_id",
                                as: "listCategory"
                            }
                        }], (err, category) => {
                            if (err) {
                                res.json({
                                    error: 0,
                                    msg: err
                                })
                            } else {
                                res.render('sanpham', {
                                    product, totalPage, category
                                })
                            }
                        });
                    })
            })
    }
}

