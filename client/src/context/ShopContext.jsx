import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import Product from "../pages/Product";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const shopContext=createContext()

const shopContextProvider=(props)=>{

    const currency = "$"
    const delivery_fee=10;
    
    const [search,setSearch]=useState('')
    const [products,setProducts]=useState([])
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems]=useState({})
    const [token,setToken]=useState('')
    const navigate=useNavigate()

    const getProductsData=async()=>{
        try {
            const response=await axios.get("http://localhost:4500/api/product/list")
            if(response.data.success){
                setProducts(response.data.response)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserCart=async(token)=>{
        try {
           const response=await axios.post("http://localhost:4500/api/cart/get",{},{headers:{token}})
           if(response.data.success){
            setCartItems(response.data.cartData)
           } 
        } catch (error) {
         console.log(error)
         toast.error(error.message)   
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem("token"))
        {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }

    })

    const addToCart= async (id,size)=>{
        if(!size){
            toast.error('Select Product Size')
            return;
        }
        let cartData=structuredClone(cartItems)

        if(cartData[id]){
            if(cartData[id][size]){
                cartData[id][size]+=1;
            }
            else{
                cartData[id][size]=1;
            }
        }else{
            cartData[id]={}
            cartData[id][size]=1
        }
        setCartItems(cartData)

        if(token){
            try {
                await axios.post("http://localhost:4500/api/cart/add",{id,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount=()=>{
        let totalCount=0;
        for (const items in cartItems){
            for(const item in cartItems[items]){
                try {
                   if(cartItems[items][item]>0){
                    totalCount+=cartItems[items][item]
                   } 
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const updateQuantity=async(id,size,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[id][size]=quantity
        setCartItems(cartData)
        if(token){
            try {
                await axios.post("http://localhost:4500/api/cart/update",{id,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount=()=>{
        let totalAmount=0
        for (const items in cartItems){
            let itemInfo=products.find((product)=>product._id === items)
            for (const item in cartItems[items]){
                if(cartItems[items][item]>0){
                    totalAmount+=itemInfo.price*cartItems[items][item]
                }
            }
        }
        return totalAmount
    }
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    const value={
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,token,setToken
    }
    return(
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider