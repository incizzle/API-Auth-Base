const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "5Fp1PF3Y896NXQVu");
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