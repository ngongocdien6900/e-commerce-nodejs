const ProductModel = require('../model/ProductModel');
const Category = require('../model/CategoryModel');
const UserModel = require('../model/UserModel');


const multer = require('multer');
const { response } = require('express');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // đường dẫn nó up lên
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        // tránh up trùng file
        cb(null, Date.now() + "-" + file.originalname)
    }
});
let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
            console.log(file);
            //những loại file được phép upload
            if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
                cb(null, true)
            } else {
                return cb(new Error('Only image are allowed!'))
            }
        }
        //name bên upload
}).single("productImage");

module.exports = {

    getHomeAdmin: (req, res) => {
        ProductModel.countDocuments({})
            .then(product => {
                UserModel.countDocuments({}).then(user => {
                    Category.countDocuments({}).then(category => {
                        res.render('admin/admin', {
                            // truyền qua bên kia
                            product, user, category
                        })
                    })
                })

            })
    },
    getProduct: async (req, res, next) => {
        //số sản phẩm 1 trang
        const PAGE_SIZE = 8;

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
                    let category = Category.aggregate([{
                        $lookup: {
                            //nhu ten db ben kia
                            from: "product",
                            localField: "products",
                            foreignField: "_id",
                            as: "listCategory"
                        }
                    }])
                    res.render('admin/listProduct', {
                        product, category, totalPage
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
                let product = await ProductModel.find({})
                    .skip(skip)
                    .limit(PAGE_SIZE)
                let totalPage = await ProductModel.countDocuments({})
                totalPage = Math.ceil(totalPage / PAGE_SIZE)
                let category = await Category.aggregate([{
                    $lookup: {
                        //nhu ten db ben kia
                        from: "product",
                        localField: "products",
                        foreignField: "_id",
                        as: "listCategory"
                    }
                }])
                res.render('admin/listProduct', {
                    product, category, totalPage
                })
            } catch (err) {
                res.json(err)
            }

        }
    },
    getAddProduct: (req, res) => {
        Category.find((err, data) => {
            if (err) {
                res.json({
                    error: 0,
                    msg: err
                })
            } else {
                res.render('admin/addProduct', { data });
            }
        })
    },
    postAddProduct: (req, res) => {
        upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                res.json({
                    error: 0,
                    msg: "A Multer error occurred when uploading"
                })
            } else if (err) {
                res.json({
                    error: 0,
                    msg: "An unknown error occurred when uploading." + err
                })
            } else {
                // Lưu vào db (req.file.filename)
                let product = new ProductModel({
                    productName: req.body.productName,
                    price: req.body.price,
                    quality: req.body.quality,
                    description: req.body.description,
                    image: req.file.filename
                });
                //lưu sản phẩm vào database
                product.save(err => {
                    if (err) {
                        res.json({
                            error: 0,
                            msg: err
                        })
                    } else {
                        // res.redirect('/admin')
                        ProductModel.findOneAndUpdate({
                            _id: product._id
                        }, {
                            // toan tu bat dau bang dau $
                            categories: req.body.slcCategory
                        }, err => {
                            if (err) {
                                res.json({
                                    error: 0,
                                    msg: err
                                })
                            } else {
                                res.redirect('/admin/listProduct')
                            }
                        })
                    }
                })
            }
        })
    },
    getEditProduct: (req, res) => {
        ProductModel.findById(
            // đã là tìm theo id thì truyền theo id thôi
            req.params.id, (err, product) => {
                if (err) {
                    res.json({
                        err: 0,
                        msg: err
                    })
                }
                // render ra trang edit và truyền kèm theo cái sản phẩm tìm ra đó
                else {
                    res.render('admin/editProduct', {
                        product
                    })
                }
            })
    },
    postEditProduct: (req, res) => {

        //req.body || req.file gọi bên trong upload vì dùng multer vì form có ectype
        // xử lí upload file (Check xem khách hàng có chọn file mới hay không ?)
        upload(req, res, err => {
            //1. Không có file mới , update mấy cái kia , k update image
            if (!req.file) {
                ProductModel.updateOne({
                        _id: req.body.idProduct
                    }, {
                        productName: req.body.productName,
                        price: req.body.price,
                        quality: req.body.quality,
                        description: req.body.description,
                    }, err => {
                        if (err) {
                            res.json({
                                error: 0,
                                msg: err
                            })
                        } else {
                            // nếu không có lỗi sẽ chuyển hướng qua trang danh sách sản phẩm admin
                            res.redirect('/admin/listProduct')
                        }
                    })
                    // có update image mới
            } else {
                if (err instanceof multer.MulterError) {
                    res.json({
                        error: 0,
                        msg: "A Multer error occurred when uploading"
                    })
                } else if (err) {
                    res.json({
                        error: 0,
                        msg: "An unknown error occurred when uploading." + err
                    })
                } else {
                    // khi người dùng chọn file
                    ProductModel.updateOne({
                        _id: req.body.idProduct
                    }, {
                        productName: req.body.productName,
                        price: req.body.price,
                        quality: req.body.quality,
                        description: req.body.description,
                        image: req.file.filename
                    }, err => {
                        if (err) {
                            res.json({
                                error: 0,
                                msg: err
                            })
                        } else {
                            // nếu không có lỗi sẽ chuyển hướng qua trang danh sách sản phẩm admin
                            res.redirect('/admin/listProduct')
                        }
                    })
                }
            }
        })
    },
    getDeleteProduct: (req, res) => {
        ProductModel.deleteOne({
            _id: req.params.id
        }, err => {
            if (err) {
                res.json({
                    err: 0,
                    msg: err
                })
            } else {
                res.redirect('/admin/listProduct')
            }
        })
    },

    //Category
    getCategory: (req, res) => {
        Category.find().
        then(data => {
            res.render('admin/listCategory', {
                listCategory: data
            });
        })
    },
    getAddCategory: (req, res) => {
        res.render('admin/addCategory');
    },
    postAddCategory: (req, res) => {
        let category = new Category({
            categoryName: req.body.category
        });
        category.save(err => {
            if (err) {
                res.json({
                    "KQ": 0,
                    msg: err
                })
            } else {
                res.redirect('/admin/category')
            }
        })
    },
    getEditCategory: (req, res) => {
        Category.findById(req.params.id, (err, data) => {
            if (err) {
                res.json({
                    "KQ": 0,
                    msg: err
                })
            } else {
                res.render('admin/editCategory', { category: data })
            }
        })
    },
    postEditCategory: (req, res) => {
        Category.updateOne({
            _id: req.body.idCategory
        }, {
            categoryName: req.body.category
        }, err => {
            if (err) {
                res.json({
                    "KQ": 0,
                    msg: err
                })
            } else {
                res.redirect('/admin/category')
            }
        })
    },
    getDeleteCategory: (req, res) => {
        Category.deleteOne({
            _id: req.params.id
        }, err => {
            if (err) {
                res.json({
                    err: 0,
                    msg: err
                })
            } else {
                ProductModel.deleteMany({
                    categories : req.params.id
                }, err => {
                    if (err) {
                        res.json({
                            err: 0,
                            msg: err
                        })
                    }else {
                        res.redirect('/admin/category')
                    }
                })
                
            }
        })
    }
}
