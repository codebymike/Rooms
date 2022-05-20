import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center space-y-12 mt-12 sm:mt-24 md:mt-32'>

        <div className='space-y-4 max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-7xl font-bold capitalize'>
            <span className='block'>404</span>
          </h1>
        </div>

        <div className='content'>
          <p>Page Not Found</p>
        </div>

      </main>
      <Footer />
    </>
  )
}