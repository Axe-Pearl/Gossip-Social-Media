// const jwt  = require("jsonwebtoken");


const verify = (req, res, next)=>{
    console.log(req.headers.token);
    next();
};

module.exports = verify;
