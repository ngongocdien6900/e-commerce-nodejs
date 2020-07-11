const express = require('express');
const route = express.Router();
const accountController = require('../controllers/accountController');


route.get('/login', accountController.getLogin)

route.post('/login',accountController.postLogin)

route.get('/register', accountController.getRegister)

route.post('/register', accountController.postRegister)

route.get('/logout', accountController.getLogout)



module.exports = route;