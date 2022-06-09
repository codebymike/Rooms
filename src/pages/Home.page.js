import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUser } from '../providers/UserProvider'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Button from '../components/Button'

export default function Home() {

  const { user, loggedIn, logIn } = useAuth();
  const { balance, createCoinVault, collection, createCollection, popmojiItems } = useUser();
  
  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center space-y-12 mt-12 sm:mt-24 md:mt-32'>

        <div className='space-y-4 max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-7xl font-bold capitalize'>
            <span className='block'>Popmoji:Rooms</span>
            <span className='block sm:text-5xl sm:mt-2'>Premium Asset Store</span>
          </h1>

          <h2 className='text-xl sm:text-2xl'>Next-generation Blockchain Asset Platform</h2>
        </div>

        { !user || !loggedIn ?
        <Button onClick={() => logIn()}>Login & Connect Wallet</Button>
        :
        <p>
          Wallet Connected<br />
          as { user.addr }
        </p>
        }

        { !collection ?
        <Button onClick={() => createCollection()}>Create Collections for PopmojiItems</Button>
        :
        <p>Collections Ready: {popmojiItems.length} items</p>
        }

        { !balance ?
         <Button onClick={() => createCoinVault()}>Initialise Wallet for PopmojiCoin</Button> 
        :
        <p>PopmojiCoin Balance: {balance}</p>
        }

      </main>
      <Footer />
    </>
  )
}
