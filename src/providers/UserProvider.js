import React, { createContext, useContext } from 'react'

import usePopmojiItems from '../hooks/usePopmojiItems.hook'
import useCollection from '../hooks/useCollection.hook'
import usePopmojiCoin from '../hooks/usePopmojiCoin.hook'
import { useAuth } from './AuthProvider'

const UserContext = createContext()

export default function UserProvider({ children }) {
  const { user } = useAuth()
  const { collection, createCollection, deleteCollection, updateCollection } = useCollection(user)
  const { data: balance, createCoinVault, getCoinBalance, mintCoins } = usePopmojiCoin(user)
  const { data: popmojiItems, mintItem } = usePopmojiItems(user, collection, getCoinBalance)

  return (
    <UserContext.Provider
      value={{
        popmojiItems,
        mintItem,
        collection,
        createCollection,
        deleteCollection,
        updateCollection,
        balance,
        createCoinVault,
        getCoinBalance,
        mintCoins
      }}>

      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
