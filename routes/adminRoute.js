const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');
const userModel = require('../model/UserModel');

//admin
route.get('/', adminController.getHomeAdmin);
//Product
//hiển thị danh sách sản phẩm
route.get('/listProduct', adminController.getProduct);
//thêm 
route.get('/add', adminController.getAddProduct);
route.post('/add', adminController.postAddProduct);
//sửa
route.get('/edit/:id', adminController.getEditProduct);
route.post('/edit', adminController.postEditProduct);
//xóa
route.get('/delete/:id', adminController.getDeleteProduct)

//Category
// hiển thị danh sách danh mục sản phẩm
route.get('/category', adminController.getCategory);
//thêm danh mục
route.get('/addCategory', adminController.getAddCategory);
route.post('/addCategory', adminController.postAddCategory);
// sửa danh mục . Truyền ID để nó biết sửa thằng nào
route.get('/editCategory/:id', adminController.getEditCategory);
route.post('/editCategory', adminController.postEditCategory);
//xóa danh mục
route.get('/deleteCategory/:id', adminController.getDeleteCategory);

module.exports = route


