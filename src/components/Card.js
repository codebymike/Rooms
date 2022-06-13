import { useState } from 'react'
import { useUser } from '../providers/UserProvider'
import Button from '../components/Button'

export default function Card({item}) {

    const { listItemForSale } = useUser();

    const [ listPrice, setListPrice ] = useState("");

    const handleListItem = () => {
        listItemForSale(item.id, parseFloat(listPrice).toFixed(2));
    }

    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="{null}">
                <img className="rounded-t-lg" src={`https://ipfs.infura.io/ipfs/${item.thumbnail}`} alt="" />
            </a>
            <div className="p-5">
                <div className='flex justify-between'>
                    <p>#{item.id}</p>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                    </h5>
                </div>
                <div>
                    {item.description}
                </div>

                <div className='flex mb-4 mt-4'>
                    <div className="w-1/2">
                        <input 
                        value={listPrice}
                        placeholder="0.00"
                        onChange={(e) => setListPrice(e.target.value)} 
                        type="number"
                        step="0.01"
                        className="min-h-full bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className='flex w-1/2 justify-end'>
                        <Button onClick={() => handleListItem()}>
                            List for Sale
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
  }