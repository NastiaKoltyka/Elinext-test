const express = require('express');
const router = express.Router();
const config = require('../../config/app');

const passport = require('passport');
const { user } = require('../../config/app');

module.exports = () => {

    router.post('/login', function (req, res, next) {
        passport.authenticate('local', {
                session: false
            }, (err, user, info) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: info ? info.message : 'Login failed',
                        user: user
                    });
                }

                req.login(user, {
                    session: false
                }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    return res.json(user);
                });
            })
            (req, res);
    });
    return router;
}