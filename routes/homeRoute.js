const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
//-----



route.get('/', homeController.getHome);
module.exports = route;


