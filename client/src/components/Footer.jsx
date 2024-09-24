import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className=''>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint libero cupiditate deserunt vel? Eum molestias voluptas inventore repellendus iusto labore</p>
        </div>
        <div>
            <p className=' text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600 '>
                <NavLink to="/"><li>Home</li></NavLink>
                <NavLink to="/about"><li>About us</li></NavLink>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9876543210</li>
                <li>contact@ecommerce.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ ecommerce.com - All Rights reserved</p>
     </div>
    </div>
  )
}

export default Footer
