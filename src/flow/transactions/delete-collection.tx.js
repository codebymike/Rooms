export const DELETE_COLLECTION = `
  import PopmojiItem from 0xPopmojiItem

  transaction() {
    prepare(acct: AuthAccount) {
      let collectionRef <- acct.load<@PopmojiItem.Collection>(from: PopmojiItem.CollectionStoragePath)
        ?? panic("Could not borrow collection reference")
      destroy collectionRef
      acct.unlink(PopmojiItem.CollectionPublicPath)
    }
  }
`