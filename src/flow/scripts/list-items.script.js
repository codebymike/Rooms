export const LIST_ITEMS = `
import PopmojiItem from 0xPopmojiItem
import NonFungibleToken from 0xNonFungibleToken

pub fun main(account: Address): [&PopmojiItem.NFT] {
    let collection = getAccount(account).getCapability(/public/PopmojiItemCollectionPublic)
        .borrow<&{PopmojiItem.CollectionPublic, NonFungibleToken.CollectionPublic}>()
            ?? panic("Collection Link Missing")

    let returnVals: [&PopmojiItem.NFT] = []
    let ids = collection.getIDs()
    for id in ids {
        returnVals.append(collection.borrowEntireNFT(id: id))
    }
    
    return returnVals
}`
