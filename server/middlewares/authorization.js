const jwt = require('jsonwebtoken')


 function authorization(req,res,next) {
    const token = req.header('x-auth-token')
    
    if (!token) 
        return res.status(401).send('access denied no token provided')
        
    try{
        const decoded = jwt.verify(token,'secretkey');
        req.user = decoded;
        next()
        }
    catch{
        res.status(400).send('invalid token')
    }
    
}
module.exports=authorization