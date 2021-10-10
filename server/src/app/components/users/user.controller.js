const userService = require('./user.service');

const getAllUsers = (req, res) => {
    return userService.getAllUsers(req.query.page, req.query.pageSize)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => res.status(error.code).json({
            code: error.code,
            description: error.description
        }));
};
const getUser = (req, res) => {
    return userService.getUser(req.params.id)
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(error.code).json({
            code: error.code,
            description: error.description
        })});
};

const createUser = (req, res) => {
    return userService.createUser(req.body)
        .then(() => {
            return res.status(200).json();
        })
        .catch(error => res.status(error.code).json({
            code: error.code,
            description: error.description
        }));
};

const updateUser = (req, res) => {
    return userService.updateUser(req.params.id, req.body)
        .then(() => {
            return res.status(200).json();
        })
        .catch(error => res.status(error.code).json({
            code: error.code,
            description: error.description
        }));
};

const removeUser = (req, res) => {
    return userService.removeUser(req.params.id)
        .then(isDeleted => {
            if (isDeleted) {
                return res.status(200).json({
                    code: 200,
                    description: 'User successfully removed'
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    description: 'There is no such user!'
                });
            }
        })
        .catch(error => res.status(error.code).json({
            code: error.code,
            description: error.description
        }));
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    getUser
};