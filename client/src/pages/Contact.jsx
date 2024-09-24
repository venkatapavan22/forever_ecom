import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'}  text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet.</p>
          <p className='text-gray-500'>Tel : +91 9876543210 <br /> Email : admin@ecommerce.com </p>
        </div>
      </div>
      <Newsletter/>
    </div>
  )
}

export default Contact
