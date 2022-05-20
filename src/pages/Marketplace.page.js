import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Marketplace() {

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center space-y-12 mt-12 sm:mt-24 md:mt-32'>

        <div className='space-y-4 max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-7xl font-bold capitalize'>
            <span className='block'>Marketplace</span>
          </h1>
        </div>

        <div className='content'>
          <p>Marketplace</p>
        </div>

      </main>
      <Footer />
    </>
  )
}
