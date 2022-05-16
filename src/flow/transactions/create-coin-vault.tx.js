export const CREATE_COIN_VAULT = `
  import FungibleToken from 0xFungibleToken
  import PopmojiCoin from 0xPopmojiCoin

  transaction {
    prepare(signer: AuthAccount) {
      if(signer.borrow<&PopmojiCoin.Vault>(from: /storage/PopmojiCoinVault) != nil) {
        return
      }
    
      signer.save(<-PopmojiCoin.createEmptyVault(), to: /storage/PopmojiCoinVault)

      signer.link<&PopmojiCoin.Vault{FungibleToken.Receiver}>(
        /public/PopmojiCoinReceiver,
        target: /storage/PopmojiCoinVault
      )

      signer.link<&PopmojiCoin.Vault{FungibleToken.Balance}>(
        /public/PopmojiCoinBalance,
        target: /storage/PopmojiCoinVault
      )
    }
  }
`