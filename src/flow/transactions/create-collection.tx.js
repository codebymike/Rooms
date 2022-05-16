export const CREATE_COLLECTION = `
  import PopmojiItem from 0xPopmojiItem
  
  transaction {
    prepare(acct: AuthAccount) {
      let collection <- PopmojiItem.createEmptyCollection()
      acct.save<@PopmojiItem.Collection>(<-collection, to: PopmojiItem.CollectionStoragePath)
      acct.link<&{PopmojiItem.CollectionPublic}>(PopmojiItem.CollectionPublicPath, target: PopmojiItem.CollectionStoragePath)
    }
  }
`