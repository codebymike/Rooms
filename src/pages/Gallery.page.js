import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useUser } from '../providers/UserProvider'
import Collection from '../components/Collection'

export default function Gallery() {

  const { collection, popmojiItems } = useUser()

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center space-y-12 mt-12 sm:mt-24 md:mt-32'>

        <div className='space-y-4 max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-7xl font-bold capitalize'>
            <span className='block'>Gallery</span>
          </h1>
        </div>

        <div className='content'>

          { collection? 
            <Collection items={popmojiItems}/>
          :
            <p>No Items to display</p>
          }

        </div>

      </main>
      <Footer />
    </>
  )
}
