import userModel from "../models/userModel.js"



// add to cart
const addToCart=async(req,res)=>{
    try {
        const {userId,id,size}=req.body
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;

        if(cartData[id]){
            if(cartData[id][size]){
                cartData[id][size]+=1
            }else{
                cartData[id][size]=1
            }
        }else{
            cartData[id]={}
            cartData[id][size]=1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
    }
}


//update user cart
const updateCart=async(req,res)=>{
    try {
        const {userId,id,size,quantity}=req.body

        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;

        cartData[id][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"cart updated"})

    } catch (error) {
        console.log(error)
    }
}

//get user cart data
const getUserCart=async(req,res)=>{

    try {
        const {userId}=req.body

        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        
        res.json({success:true,cartData:userData.cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addToCart,updateCart,getUserCart}