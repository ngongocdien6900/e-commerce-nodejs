const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

//router
const homeRouter = require('./routes/homeRoute');
const accountRouter = require('./routes/accountRoute');
const shopRouter = require('./routes/shopRoute');
const contactRouter = require('./routes/contactRoute');
const cartRouter = require('./routes/cartRoute');

//public thư mục này lên
app.use('/public', express.static('public'));

//2 cái này phải có khi dùng body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set cho máy biết mình dùng view engine là ejs
app.set('view engine', 'ejs')

app.use('/account', accountRouter);
app.use('/shop', shopRouter);
app.use('/contact', contactRouter);
app.use('/', homeRouter);
app.use('/cart', cartRouter);




app.listen(port, () => {
    console.log(`Sever is listening on port ${3000}`);
})