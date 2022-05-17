import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUser } from '../providers/UserProvider'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Button from '../components/Button'

export default function Home() {

  const { user, loggedIn, logIn } = useAuth();
  const { balance, createCoinVault, collection, createCollection, getCoinBalance } = useUser();

  console.log('account: ', user?.addr);
  console.log('balance: ', balance);
  console.log('collections: ', collection);

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
        <Button onClick={() => logIn()}>Connect Wallet</Button>
        :
        <p>Wallet Connected</p>
        }

        { !collection ?
        <Button onClick={() => createCollection()}>Initialise Collections</Button>
        :
        <p>Collections Ready</p>
        }

        { !balance ?
         <Button onClick={() => createCoinVault()}>Enable PopmojiCoin Wallet</Button> 
        :
        <p>Balance: {balance}</p>
        }

        <Button onClick={() => getCoinBalance()}>Check Balance</Button>

      </main>
      <Footer />
    </>
  )
}
