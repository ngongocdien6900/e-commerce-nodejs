const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.render('shop');
})

module.exports = route;