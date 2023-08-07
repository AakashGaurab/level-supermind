const jwt = require("jsonwebtoken");


const auth = (req,res,next)=>{
    let token = req.cookies.normal_token;          //cookie system doesnot work as it gives undefined and due to lack of time 
    next();
}

module.exports={auth};