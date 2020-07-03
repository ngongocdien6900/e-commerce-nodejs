const ProductModel = require('../model/ProductModel');

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
    getProduct : (req, res) => {
        ProductModel.find({})
        .then(product => {
            //trang chu admin
            res.render('admin', {
                // truyền qua bên kia
                product
            })
        })
    },
    getAddProduct : (req, res) => {
        res.render('addProduct');
    },
    postAddProduct : (req, res) => {
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
                        res.json({
                            //Them thành công thì chọn thêm tiếp hoặc về admin
                            error: 'Thêm thành công :' + req.body.productName + ':!'
                            
                        })
                    }
                })
            }
        })
    },
    getEditProduct : (req, res) => {
        ProductModel.findById(
            // đã là tìm theo id thì truyền theo id thôi
            req.params.id
        , (err, product) => {
            if(err) {
                res.json({
                    err : 0,
                    msg : err
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
    postEditProduct : (req, res) => {

        //req.body || req.file gọi bên trong upload vì dùng multer vì form có ectype
        // xử lí upload file (Check xem khách hàng có chọn file mới hay không ?)
        upload(req, res, err => {
            //1. Không có file mới , update mấy cái kia , k update image
            if(!req.file) {
                ProductModel.updateOne({
                    _id : req.body.idProduct
                }, {
                    productName : req.body.productName,
                    price       : req.body.price,
                    quality     : req.body.quality
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
                        _id : req.body.idProduct
                    }, {
                        productName : req.body.productName,
                        price       : req.body.price,
                        quality     : req.body.quality,
                        image       : req.file.filename
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
    }
}