export const CREATE_COIN_VAULT = `
  import FungibleToken from 0xFungibleToken
  import PopmojiCoin from 0xPopmojiCoin

  transaction {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a PopmojiCoin Vault
        if signer.borrow<&PopmojiCoin.Vault>(from: PopmojiCoin.VaultStoragePath) != nil {
            return
        }

        // Create a new PopmojiCoin Vault and put it in storage
        signer.save(
            <-PopmojiCoin.createEmptyVault(),
            to: PopmojiCoin.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&PopmojiCoin.Vault{FungibleToken.Receiver}>(
            PopmojiCoin.ReceiverPublicPath,
            target: PopmojiCoin.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&PopmojiCoin.Vault{FungibleToken.Balance}>(
            PopmojiCoin.BalancePublicPath,
            target: PopmojiCoin.VaultStoragePath
        )
    }
}
`