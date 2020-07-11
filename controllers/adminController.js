const ProductModel = require('../model/ProductModel');
const Category = require('../model/CategoryModel');

const multer = require('multer');
const { response } = require('express');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // đường dẫn nó up lên
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        // tránh up trùng file
        cb(null, Date.now() + "-" + file.originalname)
    }
});
let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
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

    getProduct: (req, res) => {
        if (req.query.search) {  
            ProductModel.find({
                productName : new RegExp(req.query.search)
            }, (err, product) => {
                if(err) {
                    res.json({
                        error: 0,
                        msg: err
                    })
                }else {
                    res.render('admin', {
                        // truyền qua bên kia
                        product
                    })
                }
            })
        } else {
            ProductModel.find({})
                .then(product => {
                    res.render('admin', {
                        // truyền qua bên kia
                        product
                    })
                })
        }

    },
    getAddProduct: (req, res) => {
        Category.find((err, data) => {
            if(err) {
                res.json({
                    error: 0,
                    msg: err
                })
            }else {
                res.render('addProduct', {data});
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
                    }
                    else {
                        // res.redirect('/admin')
                        ProductModel.findOneAndUpdate({
                            _id : product._id
                        }, {
                            // toan tu bat dau bang dau $
                            $push: {categories: req.body.slcCategory }
                        } , err => {
                            if (err) {
                                res.json({
                                    error: 0,
                                    msg: err
                                })
                            }else {
                                res.redirect('/admin')
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
            req.params.id
            , (err, product) => {
                if (err) {
                    res.json({
                        err: 0,
                        msg: err
                    })
                }
                // render ra trang edit và truyền kèm theo cái sản phẩm tìm ra đó
                else {
                    res.render('editProduct', {
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
                    }
                    else {
                        // nếu không có lỗi sẽ chuyển hướng qua trang danh sách sản phẩm admin
                        res.redirect('/admin')
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
                        }
                        else {
                            // nếu không có lỗi sẽ chuyển hướng qua trang danh sách sản phẩm admin
                            res.redirect('/admin')
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
            }
            else {
                res.redirect('/admin')
            }
        })
    },

    //Category
    getCategory: (req, res) => {
        Category.find().
            then(data => {
                res.render('listCategory', {
                    listCategory: data
                });
            })
    },
    getAddCategory: (req, res) => {
        res.render('addCategory');
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
    }
    ,
    getEditCategory: (req, res) => {
        Category.findById(req.params.id, (err, data) => {
            if (err) {
                res.json({
                    "KQ": 0,
                    msg: err
                })
            } else {
                res.render('editCategory', { category: data })
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
            }
            else {
                res.redirect('/admin/category')
            }
        })
    }
}