const Router = require('express').Router;

const users = require('./users.route');
const auth = require('./auth.route');

module.exports = () => {
    const routing = Router();
    routing.use('/users', users());
    routing.use('/auth', auth());

    return routing;
}