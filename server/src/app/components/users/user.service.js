const User = require('../shared/models/user');

const getAllUsers = (page, pageSize) => {
    return User.getAll().then(result => {
        try {
            let allUsers = result.map(user => {
                const {
                    id,
                    name,
                    email,
                    password,
                    phones, 
                    date_of_birth,
                    education,
                    is_admin,
                } = user;
                return {
                    id,
                    name,
                    email,
                    password,
                    phones, 
                    date_of_birth,
                    education,
                    is_admin,
                };
            });

            return allUsers;
        } catch (err) {
            throw new Error({code: 500, description: `Error getting all users. ${err.message}`});
        }
    });
};

const userValidation = (newUser) => {
    const {
        name,
        email,
        password
    } = newUser;
    const user = {
        name: name,
        email: email,
        password: password
    };

    for (let prop in user) {
        if (user.hasOwnProperty(prop) && (user[prop] === undefined || user[prop] == '')) {
            return false;
        }
    }
    return true;
};

const getUser = (userId) => {
    return User.getUser(userId);
};

const createUser = (newUser) => {
    try {
        const validation = userValidation(newUser);
        if (!validation) {
            return Promise.reject({code: 400, description: 'Please, fill the required user fields'});
        }
        const user = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            phones:newUser.phones,
            date_of_birth:newUser.date_of_birth,
            education:newUser.education

        };
        return User.createUser(user);

    } catch (err) {
        throw new Error({code: 500, description: `Error creating user. ${err.message}`});
    }
};

const updateUser = (userId, user) => {
    try {
        const validation = userValidation(user);
        if (!validation) {
            return Promise.reject({code: 400, description: 'Please, fill the required user fields'});
        }
        const updatedUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            phones: user.phones, 
            date_of_birth: user.date_of_birth,
            education: user.education,
        };
        return User.updateUser(userId, updatedUser);
    } catch (err) {
        throw new Error({code: 500, description: `Error updating user. ${err.message}`});
    }
};

const removeUser = (userId) => {
    return User.deleteUser(userId)
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    getUser
};