const express = require('express');
const route = express.Router();
const registerController = require('../controllers/registerController');
const checkRegister = require('../middleware/checkRegister');

route.get('/login', (req, res, next) => {
    res.render('login');
})

route.get('/register', registerController.getRegister)

route.post('/register', registerController.postRegister)

module.exports = route;