export const MINT_ITEM = `

    import PopmojiItem from 0xPopmojiItem

    transaction(ipfsHash: String, name: String, type: String) {

        let minterRef: &PopmojiItem.NFTMinter
        let collection: &PopmojiItem.Collection

        prepare(acct: AuthAccount) {
            self.collection = acct.borrow<&PopmojiItem.Collection>(from: /storage/PopmojiItemCollection)
                                ?? panic("This collection does not exist here")

            self.minterRef = acct.borrow<&PopmojiItem.NFTMinter>(from: /storage/PopmojiItemMinter)
                                ?? panic("Could not borrow minter reference")   
        }

        execute {

            let newNFT <- self.minterRef.mintNFT(ipfsHash: ipfsHash, metadata: {"name": name, "type": type})
            
            self.collection.deposit(token: <- newNFT)

            log("A user minted an NFT into their account")
        }
    }`