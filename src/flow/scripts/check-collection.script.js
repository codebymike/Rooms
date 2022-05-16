export const CHECK_COLLECTION = `
  import PopmojiItem from 0xPopmojiItem
  
  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{PopmojiItem.CollectionPublic}>(PopmojiItem.CollectionPublicPath).check()
    return ref
  }
`