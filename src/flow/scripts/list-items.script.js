export const LIST_ITEMS = `
import PopmojiItem from 0xPopmojiItem
import NonFungibleToken from 0xNoneFungibleToken

pub fun main(account: Address): [&PopmojiItem.NFT] {
    let collection = getAccount(account).getCapability(/public/PopmojiItemCollection)
        .borrow<&PopmojiItem.Collection{NonFungibleToken.CollectionPublic, PopmojiItem.CollectionPublic}>()
            ?? panic("Can't get the User's collection.")

    let returnVals: [&PopmojiItem.NFT] = []
    let ids = collection.getIDs()
    for id in ids {
        returnVals.append(collection.borrowEntireNFT(id: id))
    }
    
    return returnVals
}`
