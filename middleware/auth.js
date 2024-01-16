const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {
        // Here use the cookie-parser middleware to get the value of the cookie
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        }catch(err){}
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
}