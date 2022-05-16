import { useEffect, useReducer } from 'react'
import { mutate, query, tx } from '@onflow/fcl'

import { LIST_ITEMS } from '../flow/scripts/list-items.script'
import { MINT_ITEM } from '../flow/transactions/mint-popmoji-item.tx'
import { userItemsReducer } from '../reducer/userItemsReducer'
import { useTxs } from '../providers/TxProvider'

export default function useUserPopmojiItems(user, collection, getCoinBalance) {
  const [state, dispatch] = useReducer(userItemsReducer, {
    loading: false,
    error: false,
    data: []
  })
  const { addTx, runningTxs } = useTxs()

  useEffect(() => {
    const fetchUserItems = async () => {
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

  const mintItem = async (templateID, amount) => {
    if (!collection) {
      alert("You need to enable the collection first. Go to the tab Collection")
      return
    }
    if (runningTxs) {
      alert("Transactions are still running. Please wait for them to finish first.")
      return
    }
    try {
      let res = await mutate({
        cadence: MINT_ITEM,
        limit: 55,
        args: (arg, t) => [arg(templateID, t.UInt32), arg(amount, t.UFix64)]
      })
      addTx(res)
      await tx(res).onceSealed()
    //   await addDappy(templateID)
      await getCoinBalance()
    } catch (error) {
      console.log(error)
    }
  }

//   const addItem = async (templateID) => {
//     try {
//       let res = await query({
//         cadence: LIST_ITEMS,
//         args: (arg, t) => [arg(user?.addr, t.Address)]
//       })
//     //   const dappies = Object.values(res)
//     //   const dappy = dappies.find(d => d?.templateID === templateID)
//     //   const newDappy = new DappyClass(dappy.templateID, dappy.dna, dappy.name)
//       dispatch({ type: 'ADD', payload: newDappy })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const batchAddDappies = async (dappies) => {
//     try {
//       let res = await query({
//         cadence: LIST_ITEMS,
//         args: (arg, t) => [arg(user?.addr, t.Address)]
//       })
//       const allDappies = Object.values(res)
//       const dappyToAdd = allDappies.filter(d => dappies.includes(d?.templateID))
//       const newDappies = dappyToAdd.map(d => new DappyClass(d.templateID, d.dna, d.name))
//       for (let index = 0; index < newDappies.length; index++) {
//         const element = newDappies[index];
//         dispatch({ type: 'ADD', payload: element })
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

  return {
    ...state,
    mintItem,
    // addDappy,
    // batchAddDappies
  }
}
