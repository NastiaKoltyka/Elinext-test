const passport = require('passport');
const passportJWT = require("passport-jwt");
const User = require('../components/shared/models/user');
const config = require('../../config/app');

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (login, password, done) {
        try {
            let user = await User.getUserByCredentials(login, password);
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email or password.'
                });
            }

            return done(null, user, {
                message: 'Logged In Successfully'
            });

        } catch (err) {
            return done(err);
        }
    }));
