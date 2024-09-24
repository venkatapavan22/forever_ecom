import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode=jwt.verify(token,process.env.jwt_secret_key)
        if (token_decode !== process.env.admin_id+process.env.admin_pass){
            res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export default adminAuth