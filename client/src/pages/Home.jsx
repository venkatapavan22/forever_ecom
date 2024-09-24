import React from 'react'
import Header from '../components/Header'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import Policy from '../components/Policy'
import Newsletter from '../components/Newsletter'
const Home = () => {
  return (
    <div>
      <Header/>
      <LatestCollection/>
      <Bestseller/>
      <Policy/>
      <Newsletter/>
    </div>
  )
}

export default Home
