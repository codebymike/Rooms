export const CREATE_COLLECTION = `
  import PopmojiItem from 0xPopmojiItem
  import NonFungibleToken from 0xNonFungibleToken
  
  transaction {
    prepare(acct: AuthAccount) {
      let collection <- PopmojiItem.createEmptyCollection()
      acct.save<@PopmojiItem.Collection>(<-collection, to: /storage/PopmojiItemCollection)
      acct.link<&{PopmojiItem.CollectionPublic,NonFungibleToken.CollectionPublic}>(/public/PopmojiItemCollectionPublic, target: /storage/PopmojiItemCollection)
    }
  }
`