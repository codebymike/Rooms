export const GET_COIN_BALANCE = `
  import FungibleToken from 0xFungibleToken
  import PopmojiCoin from 0xPopmojiCoin

  pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(PopmojiCoin.BalancePublicPath)
        .borrow<&PopmojiCoin.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
  }
`