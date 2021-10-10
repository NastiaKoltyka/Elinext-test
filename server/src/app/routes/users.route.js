const express = require('express');
const route = express.Router();
const passport = require('passport');


const usersController = require('../components/users/user.controller');

module.exports = () => {
    route.get('/', usersController.getAllUsers);
    route.get('/:id', usersController.getUser); 
    route.post('/',usersController.createUser);
    route.put('/:id', usersController.updateUser);
    route.delete('/:id',  usersController.removeUser);

    return route;
}