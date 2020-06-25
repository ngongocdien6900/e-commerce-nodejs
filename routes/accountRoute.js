const express = require('express');
const route = express.Router();

route.get('/login', (req, res, next) => {
    res.render('login');
})

route.get('/register', (req, res, next) => {
    res.render('register')
})


module.exports = route;