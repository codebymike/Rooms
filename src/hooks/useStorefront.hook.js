import { useReducer } from 'react'
import { mutate, query, tx } from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import { CREATE_LISTING } from '../flow/transactions/create-listing.tx';
import { GET_LISTINGS } from '../flow/scripts/get-listings.script';
import { useTxs } from '../providers/TxProvider'

export default function useStorefront(user) {

    const [ state, dispatch ] = useReducer(defaultReducer, {
        loading: true,
        error: false,
        data: null
      })
    
    const { addTx } = useTxs()

    const getListedItems = async () => {
        dispatch({ type: 'PROCESSING' })
        try {
            let res = await query({
                cadence: GET_LISTINGS,
                args: (arg, t) => [arg(user?.addr, t.Address)]
            })
            dispatch({ type: 'SUCCESS', payload: res })
            } catch (err) {
            console.log(err)
            dispatch({ type: 'ERROR' })
        }
    }

    const listItemForSale = async (itemId, price) => {
        dispatch({ type: 'PROCESSING' })
        try {
          let transaction = await mutate({
            cadence: CREATE_LISTING,
            limit: 100,
            args: (arg, t) => [
                arg(itemId, t.UInt64),
                arg(price, t.UFix64),
              ]
          })
          addTx(transaction)
          await tx(transaction).onceSealed()
          dispatch({ type: 'SUCCESS', })
        } catch (err) {
          console.log(err);
          dispatch({ type: 'ERROR' })
        }
    }

    return {
        ...state,
        getListedItems,
        listItemForSale,
    }
}