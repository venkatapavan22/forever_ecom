import mongoose from "mongoose";


const dbConnection=()=>{
    mongoose.connect(process.env.db_url).then(()=>{
        console.log("db is connected")
    }).catch((err)=>{
        console.log(err.message)
    })
}


export default dbConnection