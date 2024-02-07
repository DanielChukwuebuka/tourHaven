const jwt = require("jsonwebtoken")
const userModel = require("../model/model")
const authorized = async (req, res, next)=>{
try {
let token;

if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
){
    token = req.headers.authorization.split(" ")[1]
}

if(!token){
return res.status(404).json({
    message: "authorization token is required"
})
}

    const decodeToken = jwt.verify(token, process.env.secret)
// console.log("Token:  "+decodeToken)
    const user = await userModel.findById(decodeToken.userId)
    // console.log("user: "+user)
if(!user){
    return res.status(404).json({
        message:"user not found"
    })
}


req.user = user
    next()

}

catch (error){
    res.status(500).json({
message: "server error"+ error.message
    })
}

}

module.exports = authorized