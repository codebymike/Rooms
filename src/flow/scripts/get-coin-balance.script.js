export const GET_COIN_BALANCE = `
  import FungibleToken from 0xFungibleToken
  import PopmojiCoin from 0xPopmojiCoin

  pub fun main(address: Address): UFix64? {
    let account = getAccount(address)
    if let vaultRef = account.getCapability(/public/PopmojiCoinBalance).borrow<&PopmojiCoin.Vault{FungibleToken.Balance}>() {
      return vaultRef.balance
    } 
    return nil
  }
`