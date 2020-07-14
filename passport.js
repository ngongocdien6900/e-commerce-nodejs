// const accountModel = require('./model/UserModel')
// const passport = require('passport'),
//     FacebookStrategy = require('passport-facebook').Strategy;
// passport.use(new FacebookTokenStrategy({
//         clientID: "943229829435176",
//         clientSecret: "5675ccfd75921e70fd815ec5dc842b5d",
//         callbackURL: "https://8bd0d21c1053.ngrok.io/auth/facebook/callback",
//         profileFields = ["email", "displayName"]
//     },
//     function(accessToken, refreshToken, profile, done) {
//         let user = accountModel.findByFacebookUid(profile.id);
//         //nếu tồn tại
//         if (user) {
//             return done(null, user)
//         }
//         //nếu chưa
//         let newUser = {
//             username: profile.displayName,
//             facebook: {

//             }
//         }
//         User.findOne({
//                 $or: [{
//                         facebookId: { $eq: profile.id }
//                     },
//                     { email: { $eq: profile.emails[0].value } }
//                 ]
//             },
//             function(err, user) {
//                 if (err) {
//                     return done(err, false);
//                 }
//                 if (user) {
//                     done(null, user);
//                 } else {
//                     done(null, false);
//                 }
//             }
//         );
//     }));