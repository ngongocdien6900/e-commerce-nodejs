const express = require('express');
const route = express.Router();
const sanphamController = require('../controllers/sanphamController');

route.get('/', sanphamController.getSanPham);
route.get('/:id', sanphamController.getDetailProduct);
route.get('/danhmuc/:idCategory', sanphamController.getProductByCategory);

module.exports = route;