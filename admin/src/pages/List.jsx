import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList]=useState([])

  const fetchList=async()=>{
    try {
      const response=await axios.get("http://localhost:4500/api/product/list")
      if(response.data.success){
        setList(response.data.response)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  const deleteProduct= async (id)=>{
    try {
      const response=await axios.post("http://localhost:4500/api/product/remove",{id})
      if(response.data.success){
        toast.success('product removed')
        fetchList()
      }else{
        toast.error('error occured')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchList()
    },[])

  return (
    <>
    <p className='mb-2'>All Products list</p>
    <div className='flex flex-col gap-2'>
      {/* {------list table---------} */}
      <div className='hidden md:grid grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/* {--------products list---------} */} 
      {
        list.map((item,index)=>{
            return(
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img className='w-12' src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>$ {item.price}</p>
                <p onClick={()=>deleteProduct(item._id)} className='text-right md:text-center text-lg cursor-pointer'>X</p>
              </div>
            )
        })
      }
    </div>
    </>
  )
}

export default List
