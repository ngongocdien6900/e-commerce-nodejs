const accountModel = require('./model/UserModel');
const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: "943229829435176",
        clientSecret: "5675ccfd75921e70fd815ec5dc842b5d",
        callbackURL: "https://cf6a7284c650.ngrok.io/auth/facebook/callback",
        passReqToCallBack: true,
        //lấy những trường trên fb về
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        //kiểm tra profile này có trong database chưa
            accountModel.findOne({email : profile._json.email}, (err, user) => {
                if(err) {
                    return done(err);
                } if(user){ //tồn tại user
                    return done(null, user);
                }
                //nếu chưa có trong db
                let account = new accountModel({
                    name : profile.displayName,
                    username : '',
                    email : profile._json.email,
                    passport: '',
                    address : '',
                    phone: '',
                    image: ''
                });
                account.save(err => {
                    if(err) throw err;
                    return done(null, account);
                })
            })
        
    }));

    //ghi thông tin vào session
passport.serializeUser((user, done) => {
    done(null, user.id)
})
    //
passport.deserializeUser((id, done) => {
    accountModel.findOne({
        _id : id
    })
    .then(user => {
        return done(null, user);
    })
    .catch(err => {
        return done(err, null);
    })
})
