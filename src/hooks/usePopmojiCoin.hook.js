import { useEffect, useReducer, useCallback } from 'react'
import { CREATE_COIN_VAULT } from '../flow/transactions/create-coin-vault.tx';
import { MINT_COIN } from '../flow/transactions/mint-popmoji-coin';
import { GET_COIN_BALANCE } from '../flow/scripts/get-coin-balance.script';
import { defaultReducer } from '../reducer/defaultReducer'
import { query, mutate, tx } from '@onflow/fcl'
import { useTxs } from '../providers/TxProvider'

export default function usePopmojiCoin(user) {
  const [ state, dispatch ] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })
  const { addTx } = useTxs()


  const getCoinBalance = useCallback(() => {
    const callback = async () => {
        console.log('getCoinBalance')
        if( !user || !user.addr ) return;
    
        dispatch({ type: 'PROCESSING' })
        try {
          let response = await query({
            cadence: GET_COIN_BALANCE,
            args: (arg, t) => [
              arg(user?.addr, t.Address)
            ]
          })
          console.log('res', response);
          dispatch({ type: 'SUCCESS', payload: response })
        } catch (err) {
          dispatch({ type: 'ERROR' })
          console.log(err)
        }
    }
    callback();
    
    },[user]
  )

  useEffect(() => {
    getCoinBalance();
  }, [getCoinBalance])

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

  const mintCoins = async ({coinAddress, coinAmount}) => {

    console.log(coinAddress, coinAmount);

    dispatch({ type: 'PROCESSING' })
    try {
      let transaction = await mutate({
        cadence: MINT_COIN,
        limit: 55,
        args: (arg, t) => [
          arg(coinAddress, t.Address),
          arg(coinAmount, t.UFix64)
        ]
      })
      addTx(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  return {
    ...state,
    createCoinVault,
    getCoinBalance,
    mintCoins
  }
}