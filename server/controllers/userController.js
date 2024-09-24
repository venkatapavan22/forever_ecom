import userModel from "../models/userModel.js"
import bcrypt, { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken=(id)=>{
    return jwt.sign({id},process.env.jwt_secret_key)
}


//user login Route
const loginUser  =  async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
    if (!user){
        return res.json({success:false,message:"user not registered"})
    }
    const isPassMatch=await bcrypt.compare(password,user.password)
    if (isPassMatch){
        const token=createToken(user._id)
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"invalid credentials"})
    }
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//user register Route
const registerUser = async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const exists=await userModel.findOne({email})
        if (exists){
            return res.json({success:false,message:"user already exists"})
        }
        const hashedPass=await bcrypt.hash(password,10)
        const user=new userModel({
            name,email,password:hashedPass
        })
        await user.save()
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:error.message})
    }
}

//admin login Route

const adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body
        if (email===process.env.admin_id && password===process.env.admin_pass)
        {
            const token=jwt.sign(email+password,process.env.jwt_secret_key)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {loginUser,registerUser,adminLogin}