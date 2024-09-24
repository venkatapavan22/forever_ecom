import {v2 as cloudinary} from 'cloudinary'

const cloudinary_connect = async ()=>{


    cloudinary.config({
        cloud_name:process.env.cloudinary_name,
        api_key:process.env.cloudinary_api_key,
        api_secret:process.env.cloudinary_secret_key
    })


}

 
export default cloudinary_connect