module.exports = {
    getCart : (req, res) => {
        res.render('cart');
    },
    getCheckout : (req, res) => {
        //kiểm tra nếu đăng nhập rồi thì cho vào trang thanh toán
        if(req.session.userId) {
            res.render('checkout');
        }
        //nếu chưa đăng nhập
        res.redirect('/account/login')
        
    }
}