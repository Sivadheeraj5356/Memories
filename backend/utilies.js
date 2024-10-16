const jwt = require("jsonwebtoken")

function authenticationToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        res.sendStatus(401)
        return
    }
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.sendStatus(401)
            return
        }
        req.user = decoded
        next()
    })
}
module.exports = {
    authenticationToken,
};