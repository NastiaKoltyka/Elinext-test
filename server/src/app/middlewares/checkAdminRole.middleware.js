const roleCheckMiddleware = (req, res, next) => {
    if (req.user.is_admin) {
        next();
    } else {
        res.status(403).send({code: "403", description: "Admin role required to perform this request"});
    }
};

module.exports = roleCheckMiddleware;