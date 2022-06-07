export const MINT_COIN = `

import FungibleToken from 0xFungibleToken
import PopmojiCoin from 0xPopmojiCoin

transaction(recipient: Address, amount: UFix64) {

  /// Reference to the PopmojiCoin Admin Resource object
  let tokenAdmin: &PopmojiCoin.Administrator

  /// Reference to the Fungible Token Receiver of the recipient
  let tokenReceiver: &{FungibleToken.Receiver}

  /// The total supply of tokens before the burn
  let supplyBefore: UFix64

  prepare(signer: AuthAccount) {
      self.supplyBefore = PopmojiCoin.totalSupply

      // Borrow a reference to the admin object
      self.tokenAdmin = signer.borrow<&PopmojiCoin.Administrator>(from: PopmojiCoin.AdminStoragePath)
          ?? panic("Signer is not the token admin")

      // Get the account of the recipient and borrow a reference to their receiver
      self.tokenReceiver = getAccount(recipient)
          .getCapability(PopmojiCoin.ReceiverPublicPath)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Unable to borrow receiver reference")
  }

  execute {

      // Create a minter and mint tokens
      let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
      let mintedVault <- minter.mintTokens(amount: amount)

      // Deposit them to the receiever
      self.tokenReceiver.deposit(from: <-mintedVault)

      destroy minter
  }

  post {
      PopmojiCoin.totalSupply == self.supplyBefore + amount: "The total supply must be increased by the amount"
  }
}
`