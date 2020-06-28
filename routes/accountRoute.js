const express = require('express');
const route = express.Router();
const accountController = require('../controllers/accountController');
const accountMiddleware = require('../middleware/accountMiddleware');

route.get('/login', accountController.getLogin)

route.post('/login', accountController.postLogin)

route.get('/register', accountController.getRegister)

route.post('/register', accountController.postRegister)


//test
route.get('/test', accountController.test)

module.exports = route;