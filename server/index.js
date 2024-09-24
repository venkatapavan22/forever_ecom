import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './config/db.js'
import cloudinary_connect from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'

dotenv.config()

//App config
const app=express()
const port=process.env.port || 5000

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)

//Db connection
dbConnection()
cloudinary_connect()


app.get("/",(req,res)=>{
    res.send("hi shetty bro ")
})


app.listen(port,()=>{
    console.log(`port is running at ${process.env.port}`)
})