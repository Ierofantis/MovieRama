const GitHubStrategy = require('passport-github').Strategy;

var User = require('../models').user

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

module.exports = function (passport) {

    passport.use(
        new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            /* Match user */
            User.findOne({
                where: {
                    username: profile.username,
                }
            }).then(function (user) {
                if (user) {
                    return done(null, profile.username);

                } else {
                    var data =
                    {
                        email: profile.emails[0].value,
                        username: profile.username,
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            console.log("newUser", newUser)
                            return done(null, newUser.username);
                        }
                    });
                }
            }).catch(function (error) {
                console.log(">> Error on passport strategy: " + error);
            });
        }
        ));

    // serialize
    passport.serializeUser(function (user, done) {
        console.log("username", user)
        done(null, user);
    });

    // deserialize user 
    passport.deserializeUser(function (username, done) {
        User.findOne({
            where: {
                username: username,
            }
        }).then(function (user) {
            if (user) {
                console.log("user_get", user.get())
                done(null, user.get());
            } else {
                console.log("user errors", user.errors)
                done(user.errors, null);
            }
        }).catch(function (error) {
            console.log(">> Error on deserializeUser: " + error);
        })
    });
}