const jwt = require('jsonwebtoken');
const config = require('../../config.json')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.jwt_secret);
        req.userData = decoded;
        if (decoded.role === 'admin') {
            next();
        }
        else {
            error
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};