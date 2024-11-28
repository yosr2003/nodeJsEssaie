import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (token){
        jwt.verify(token, process.env.SECRET_KEY,(err, decoded)=>{
           if (err){
            return res.redirect("/authRegister");
           } req.userData=decoded;
           next();
     } )


    }
    else{
        return res.redirect("/authRegister");
    }

};

export default validateToken;
