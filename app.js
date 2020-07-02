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
app.use('/shop', shopRouter);
app.use('/contact', contactRouter);
app.use('/', homeRouter);
app.use('/admin', adminRouter)


// --- detail
app.get('/product_detail', (req, res) => {
    res.render('product-detail')
})

app.use('/cart', cartRouter);


// app.get('/admin/add', (req, res) => {
//     res.render('admin');
// })

// app.post('/admin/add', (req, res) => {
//     upload(req, res, err => {
//         if (err instanceof multer.MulterError) {
//             res.json({
//                 error: 0,
//                 msg: "A Multer error occurred when uploading"
//             })
//         } else if (err) {
//             res.json({
//                 error: 0,
//                 msg: "An unknown error occurred when uploading." + err
//             })
//         } else {
//             // Lưu vào db (req.file.filename)
//             let product = new ProductModel({
//                 productName: req.body.productName,
//                 price: req.body.price,
//                 quality: req.body.quality,
//                 image: req.file.filename
//             });
//             product.save(err => {
//                 if (err) {
//                     res.json({
//                         error: 0,
//                         msg: err
//                     })
//                 }
//                 else {
//                     res.json({
//                         error: 1
//                     })
//                 }

//             })
//         }
//     })
// })

// app.get('/danhsachsp', (req, res) => {
//     ProductModel.find({})
//         .then(product => {
//             res.render('danhsachspAdmin', {
//                 product
//             })
//         })
// })

//edit 
// app.get('/edit/:id', (req, res) => {
//     ProductModel.findById(
//         // đã là tìm theo id thì truyền theo id thôi
//         req.params.id
//     , (err, data) => {
//         if(err) {
//             res.json({
//                 err : 0,
//                 msg : err
//             })
//         }
//         else {
//             console.log(data)
//             res.render('editsp', {product : data})
//         }
//     })
// })



// app.post('/edit', (req, res) => {
//     res.send("EDIT POST")
// })

app.listen(port, () => {
    console.log(`Sever listening on port ${port}`);
})