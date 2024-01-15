const jwt = require('jsonwebtoken');

const secret = "$ecretAbhi@1234";

function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = jwt.sign(payload, secret);
    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    generateToken,
    verifyToken,
};