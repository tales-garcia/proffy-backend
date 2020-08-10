const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ err: 'No token provided' })
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2) {
        return res.status(401).send({ err: 'Token error' })
    }

    const [scheme, token] = parts;
    if(/ˆbearer/.test(scheme)) {
        return res.status(401).send({ err: 'malformatted Token' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ err: 'Invalid token' })

        req.userId = decoded.id;
        return next();
    });
};