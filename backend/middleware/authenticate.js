const jwt = require("jsonwebtoken");


const auth = (req,res,next)=>{

    let token = req.cookies.normal_token;   

    jwt.verify(token,"blog",(err,decoded)=>{
        if (decoded){
            next();
        }
        else {
            res.json([]);
        }
    })
}

module.exports={auth};
