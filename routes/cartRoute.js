const express = require('express');
const route = express.Router();
const cartController = require('../controllers/cartController')

route.get('/', cartController.getCart)
route.get('/checkout', cartController.getCheckout)

module.exports = route;