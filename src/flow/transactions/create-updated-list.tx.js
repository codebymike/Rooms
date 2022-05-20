export const CREATE_UPDATED_LINK = `
  import PopmojiItem from 0xPopmojiItem
  import NonFungibleToken from 0xNonFungibleToken
  
  transaction {
    prepare(acct: AuthAccount) {

        // acct.unlink(/public/PopmojiItemCollectionPublic)
        // acct.link<&{PopmojiItem.CollectionPublic,NonFungibleToken.CollectionPublic}>(/public/PopmojiItemCollectionPublic, target: /storage/PopmojiItemCollection)

        let collectionRef <- acct.load<@DappyContract.Collection>(from: DappyContract.CollectionStoragePath)
            ?? panic("Could not borrow collection reference")
        
            destroy collectionRef
        acct.unlink(DappyContract.CollectionPublicPath)
    }
  }
`