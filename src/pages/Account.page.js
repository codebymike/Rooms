import React, {useState} from 'react'
import { useUser } from '../providers/UserProvider'
import { useAuth } from '../providers/AuthProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'


export default function Account() {

  const { mintItem } = useUser(); 
  const { user } = useAuth(); 

  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemFile, setItemFile] = useState("");

  const [coinAddress, setCoinAddress] = useState("");
  const [coinAmount, setCoinAmount] = useState("");

  const handleMintItem = () => {
    const item = {
      itemName,
      itemType,
      itemFile
    };
    mintItem(item);
  }

  const handleMintCoin = () => {
    const item = {
      coinAddress,
      coinAmount
    };
  }

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center space-y-12 mt-12 sm:mt-24 md:mt-32'>

        <div className='space-y-4 max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-7xl font-bold capitalize'>
            <span className='block'>Account</span>
          </h1>
        </div>

        <div className='content'>
          <h2 className='text-xl sm:text-2xl mb-6 text-center'>Mint New Popmoji:Item</h2>

          <form className="w-full max-w-sm">

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Item Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input onChange={(e) => setItemName(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Type
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <select onChange={(e) => setItemType(e.target.value)}  className="block text-gray-700 appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="Outfit">Outfit</option>
                  <option value="Headwear">Headwear</option>
                  <option value="Accessory">Accessory</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  NFT Image
                </label>
              </div>
              <div className="md:w-2/3">
              <input onChange={(e) => setItemFile(e.target.files[0])} className="form-control
                block
                w-full
                py-1.5
                text-base
                font-normal
                text-white
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <Button onClick={() => handleMintItem() } >Mint NFT</Button>
              </div>
            </div>

          </form>

        </div>

        <div className='content'>
          <h2 className='text-xl sm:text-2xl mb-6 text-center'>Mint New Popmoji:Coins</h2>

          <form className="w-full max-w-sm">

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Target Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input value={user?.addr ? user?.addr : ""} onChange={(e) => setCoinAddress(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Amount
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  value={coinAmount}
                  placeholder="0.00"
                  onChange={(e) => setCoinAmount(e.target.value)} 
                  type="number"
                  step="0.01"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <Button onClick={() => handleMintCoin() } >Deposit Funds</Button>
              </div>
            </div>

          </form>
        </div>

      </main>
      <Footer />
    </>
  )
}
