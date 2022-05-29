const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send('token is required for authentication');
    }

    try {
        console.log(token, process.env.TOKEN_KEY);
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.body.emailId = decoded.emailId;
    } catch(err) {
        return res.status(401).send('invalid token');
    }

    return next();
}

module.exports = verifyToken;