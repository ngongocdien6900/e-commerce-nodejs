
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
app.use(initialize());
passport.use(new FacebookStrategy({
    //ID ứng dụng
    clientID: 943229829435176,
    //khoá bí mật của ứng dụng bên FB
    clientSecret: "5675ccfd75921e70fd815ec5dc842b5d",
    callbackURL: "http://localhost:3000/auth/facebook/callback" 
},
function (accessToken, refreshToken, profile, done) {
    if (err) {
        return done(err); 
    }
    done(null, user);
    }
));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
//end