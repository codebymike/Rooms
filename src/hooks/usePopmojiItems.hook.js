import { useEffect, useReducer } from 'react'
import { mutate, query, tx } from '@onflow/fcl'
import { create } from 'ipfs-http-client'

import { LIST_ITEMS } from '../flow/scripts/list-items.script'
import { MINT_ITEM } from '../flow/transactions/mint-popmoji-item.tx'
import { userItemsReducer } from '../reducer/userItemsReducer'
import { useTxs } from '../providers/TxProvider'

export default function usePopmojiItems(user, collection, getCoinBalance) {

  const ipfs = create('https://ipfs.infura.io:5001/api/v0')

  const [state, dispatch] = useReducer(userItemsReducer, {
    loading: false,
    error: false,
    data: []
  })
  const { addTx, runningTxs } = useTxs()

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user?.addr) return

      dispatch({ type: 'PROCESSING' })
      try {

        let res = await query({
          cadence: LIST_ITEMS,
          args: (arg, t) => [arg(user?.addr, t.Address)]
        })

        dispatch({ type: 'SUCCESS', payload: res })
      } catch (err) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetchUserItems()
    //eslint-disable-next-line
  }, [])

  const mintItem = async (item) => {
    if (!collection) {
      alert("You need to enable the collection first. Go to the tab Collection")
      return
    }
    if (runningTxs) {
      alert("Transactions are still running. Please wait for them to finish first.")
      return
    }

    const {itemName, itemType, itemFile} = item;

    try {
      //add image to IPFS
      const added = await ipfs.add(itemFile);
      const hash = added.path

      let res = await mutate({
        cadence: MINT_ITEM,
        limit: 55,
        args: (arg, t) => [arg(hash, t.String), arg(itemName, t.String), arg(itemType, t.String)]
      })
      addTx(res)
      await tx(res).onceSealed()
      dispatch({ type: 'ADD', payload: item })
      await getCoinBalance()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    ...state,
    mintItem,
  }
}
