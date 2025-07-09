const jwt = require('jsonwebtoken');
const secretKey =  process.env.SECRET_KEY;


const authentication= (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];  // Extract the token part
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden'+ err, statusCode: 403, success: false });
            }
            req.user = user;
            next();
        });
    } else {        
        return res.status(401).json({ message: 'Unauthorized', statusCode: 401, success: false });
    }
}

 module.exports =  authentication ;
