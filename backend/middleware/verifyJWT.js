const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader?.startsWith('Bearer ')) {
            var token = authHeader.split(' ')[1];
        }
        
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    // console.log(token)
    // jwt.verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if (err) return res.sendStatus(403); //invalid token
    //         // console.log(decoded);
    //         req.id = decoded.UserInfo.id;
    //         req.roles = decoded.UserInfo.roles;

    //         // req.roles = decoded.roles;
    //         // console.log(req._id);
    //         next();
    //     }
    // );
}

module.exports = verifyJWT;