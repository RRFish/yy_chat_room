const jwt = require("jsonwebtoken")
const { YyResponse } = require("./response.js")

const secretKey = "123456"

exports.tokenCreate = function(username, password){
    return jwt.sign({username, password}, secretKey)
}

const NO_VERIFY_API_PATH = [
    "/login"
]
exports.authenticationMiddleware = (req, res, next) => {
    let token
    try {
        token = req.headers['authorization']
    } catch (e) {
        token = ''
    }

    if(NO_VERIFY_API_PATH.includes(req.path)) {
        next()
    }else{
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                return res.send(new YyResponse(400, false))
            } else {
                res.locals.user = decoded
                next()
            }
        });
    }

  };

