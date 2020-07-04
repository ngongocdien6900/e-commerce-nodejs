const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
//dùng để upload file image
const multer = require('multer')

//router
const homeRouter = require('./routes/homeRoute');
const accountRouter = require('./routes/accountRoute');
const shopRouter = require('./routes/shopRoute');
const contactRouter = require('./routes/contactRoute');
const cartRouter = require('./routes/cartRoute');
const adminRouter = require('./routes/adminRoute');

// const accountMiddleware = require('./middleware/accountMiddleware');

//public thư mục này lên
app.use('/public', express.static('public'));

//2 cái này phải có khi dùng body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//cookie
app.use(cookieParser())

//set cho máy biết mình dùng view engine là ejs
app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/account', accountRouter);
app.use('/sanpham', shopRouter);
app.use('/contact', contactRouter);
app.use('/', homeRouter);
app.use('/admin', adminRouter)
app.use('/cart', cartRouter);





app.listen(port, () => {
    console.log(`Sever listening on port ${port}`);
})