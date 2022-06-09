export const LIST_ITEMS = `
import PopmojiItem from 0xPopmojiItem
import NonFungibleToken from 0xNonFungibleToken

pub fun main(account: Address): [&NonFungibleToken.NFT] {
    let collection = getAccount(account).getCapability(PopmojiItem.CollectionPublicPath)
        .borrow<&{PopmojiItem.PopmojiItemCollectionPublic, NonFungibleToken.CollectionPublic}>()
            ?? panic("Collection Link Missing")

    let returnVals: [&NonFungibleToken.NFT] = []
    let ids = collection.getIDs()
    for id in ids {
        returnVals.append(collection.borrowNFT(id: id))
    }
    
    return returnVals
}`
