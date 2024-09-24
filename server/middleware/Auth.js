import jwt from 'jsonwebtoken'

const authUser=(req,res,next)=>{
    const {token}=req.headers
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const tokenDecode=jwt.verify(token,process.env.jwt_secret_key)
        req.body.userId=tokenDecode.id
        next()


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser