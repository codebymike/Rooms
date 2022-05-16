export const mintTx = `
    import PopmojiCoin from 0xPopmojiCoin

    let minterRef: &PopmojiCoin.NFTMinter
    let collection: &PopmojiCoin.Collection

    transaction(ipfsHash: String, name: String) {

        prepare(acct: AuthAccount) {
            self.collection = acct.borrow<&PopmojiCoin.Collection>(from: /storage/PopmojiCoinCollection)
                                ?? panic("This collection does not exist here")

            self.minterRef = acct.borrow<&PopmojiCoin.NFTMinter>(from: /storage/PopmojiCoinMinter)
                                ?? panic("Could not borrow minter reference")   
        }

        execute {

            let newNFT <- self.minterRef.mintNFT(ipfsHash: ipfsHash, metadata: {"name": name})
            
            collection.deposit(token: <- newNFT)

            log("A user minted an NFT into their account")
        }
    }`