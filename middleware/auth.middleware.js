const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    try {
        req.payload = jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
        res.status(401).json({ error: "Vous devez être authentifié pour réaliser cette action" });
    }
    next();
}