import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


//add product
const addProduct=async(req,res)=>{
     try {
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body

        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)

        let imagesUrl=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        const productData={
            name,
            description,
            price:Number(price),
            image:imagesUrl,
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestseller:bestseller==='true'?true:false,
            date:Date.now()
        }
        const product=new productModel(productData)
        await product.save()
        res.json({success:true,message:"product added"})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }
}

//list products
const listProducts=async(req,res)=>{
    try {
        const response=await productModel.find({})
        res.json({success:true,response})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//remove Product
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//single product
const singleProduct=async(req,res)=>{
    try {
        const {id}=req.body
        const product=await productModel.findById(id)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addProduct,listProducts,removeProduct,singleProduct}