const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');

//hiển thị ra toàn bộ sản phẩm bên admin
route.get('/', adminController.getProduct);
route.get('/add', adminController.getAddProduct);
route.post('/add', adminController.postAddProduct);
route.get('/edit/:id', adminController.getEditProduct);
route.post('/edit', adminController.postEditProduct);

module.exports = route