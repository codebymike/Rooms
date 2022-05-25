export const MINT_COIN = `

import FungibleToken from 0xFungibleToken
import PopmojiCoin from 0xPopmojiCoin

transaction (to: Address, amount: UFix64) {
  let sentVault: @FungibleToken.Vault

  prepare(signer: AuthAccount) {
    let minterRef = signer.borrow<&PopmojiCoin.Minter>(from: /storage/PopmojiCoinMinter) ?? panic("Cannot borrow reference")
    self.sentVault <- minterRef.mintTokens(amount: amount)
  }

  execute {
    let recipient = getAccount(to)
    let receiverRef = recipient.getCapability(/public/PopmojiCoinReceiver).borrow<&{FungibleToken.Receiver}>()
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

    // Deposit the withdrawn tokens in the recipient's receiver
    receiverRef.deposit(from: <-self.sentVault)
  }
}
`