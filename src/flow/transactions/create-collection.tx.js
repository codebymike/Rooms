export const CREATE_COLLECTION = `
  import PopmojiItem from 0xPopmojiItem
  import NonFungibleToken from 0xNonFungibleToken
  import MetadataViews from 0xMetaDataViews
  
  transaction {

      prepare(signer: AuthAccount) {
          // Return early if the account already has a collection
          if signer.borrow<&PopmojiItem.Collection>(from: PopmojiItem.CollectionStoragePath) != nil {
              return
          }

          // Create a new empty collection
          let collection <- PopmojiItem.createEmptyCollection()

          // save it to the account
          signer.save(<-collection, to: PopmojiItem.CollectionStoragePath)

          // create a public capability for the collection
          signer.link<&{NonFungibleToken.CollectionPublic, PopmojiItem.PopmojiItemCollectionPublic, MetadataViews.ResolverCollection}>(
              PopmojiItem.CollectionPublicPath,
              target: PopmojiItem.CollectionStoragePath
          )
      }
  }
`