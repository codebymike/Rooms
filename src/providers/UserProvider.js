import React, { createContext, useContext } from 'react'

import useUserPopmojiItems from '../hooks/useUserPopmojiItems.hook'
import useCollection from '../hooks/use-collection.hook'
import usePopmojiCoin from '../hooks/usePopmojiCoin.hook'
import { useAuth } from './AuthProvider'

const UserContext = createContext()

export default function UserProvider({ children }) {
  const { user } = useAuth()
  const { collection, createCollection, deleteCollection } = useCollection(user)
  const { data: balance, createCoinVault, getCoinBalance } = usePopmojiCoin(user)
  const { data: UserPopmojiItems, mintItem } = useUserPopmojiItems(user, collection, getCoinBalance)

  return (
    <UserContext.Provider
      value={{
        UserPopmojiItems,
        mintItem,
        collection,
        createCollection,
        deleteCollection,
        balance,
        createCoinVault,
        getCoinBalance
      }}>

      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
