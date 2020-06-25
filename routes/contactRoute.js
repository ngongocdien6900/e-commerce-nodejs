const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.render('contact');
})

module.exports = route;