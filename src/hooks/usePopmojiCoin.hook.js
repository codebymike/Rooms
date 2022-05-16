import { useEffect, useReducer } from 'react'
import { CREATE_COIN_VAULT } from '../flow/transactions/create-coin-vault.tx';
import { GET_COIN_BALANCE } from '../flow/scripts/get-coin-balance.script';
import { defaultReducer } from '../reducer/defaultReducer'
import { query, mutate, tx } from '@onflow/fcl'
import { useTxs } from '../providers/TxProvider'

export default function usePopmojiCoin(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })
  const { addTx } = useTxs()

  useEffect(() => {
    getCoinBalance();
    //eslint-disable-next-line 
  }, [])

  const getCoinBalance = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      let response = await query({
        cadence: GET_COIN_BALANCE,
        args: (arg, t) => [
          arg(user?.addr, t.Address)
        ]
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const createCoinVault = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      let transaction = await mutate({
        cadence: CREATE_COIN_VAULT,
        limit: 100
      })
      addTx(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS', })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    createCoinVault,
    getCoinBalance
  }
}