import jwt from "jsonwebtoken";

// admin authentication
const authUser = async(req,res,next)=>{

    try{
        const {token}=req.headers;
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.SECRET_JWT);
        req.body.userId = token_decode.id;
        next();

    }catch(error){
        console.log(error);
        res.status(404).json({success:false, message:error.message});

    }
}

export default authUser;