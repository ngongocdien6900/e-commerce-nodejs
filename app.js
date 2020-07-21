const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const checkRole = require('./middleware/checkRole');
const ejs = require('ejs');
const app = express();
const port = 3000;
//dùng để upload file image
const multer = require('multer');
//fb
const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

// session 
const session = require('express-session');

//router
const homeRouter = require('./routes/homeRoute');
const accountRouter = require('./routes/accountRoute');
const shopRouter = require('./routes/shopRoute');
const contactRouter = require('./routes/contactRoute');
const cartRouter = require('./routes/cartRoute');
const adminRouter = require('./routes/adminRoute');

//set cho máy biết mình dùng view engine là ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//public thư mục này lên
app.use('/public', express.static('public'));

//2 cái này phải có khi dùng body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookie-parser
app.use(cookie());

//session
app.use(session({ 
    secret: 'ThanhUyen',
    saveUninitialized:true,
    resave: true,
    cookie: { maxAge: 60000000000 } 
}));


//fb
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/account/login'}), (req, res) => {
    req.session.userId = req.user;
    res.redirect('/');
});
const ppFB = require('./passport');

global.loggedIn = null;
app.use("*", checkRole.isLogged);
global.role = null;

//end
app.use("/account/editProfile", checkRole.isLoggedRole, accountRouter);
app.use("pagenotfound", checkRole.isLoggedRole, accountRouter);

app.use('/account', accountRouter);
app.use('/sanpham', shopRouter);
app.use('/contact', contactRouter);
app.use('/', homeRouter);
// check xem nếu role bằng 1 thì cho vô . K thì ra trang home
app.use('/admin', checkRole.checkRole, adminRouter);
app.use('/cart', cartRouter);

// Chuyển trang không tìm thấy 404
app.use((req, res) => res.render('pagenotfound'));

app.listen(port, () => {
    console.log(`Sever listening on port ${port}`);
})

