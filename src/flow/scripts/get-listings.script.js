export const GET_LISTINGS = `

import NFTStorefront from 0xNFTStorefront
import NonFungibleToken from 0xNonFungibleToken

// This script returns an array of all the NFTs uuids for sale through a Storefront
pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

    let storefrontRef = account
        .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
            NFTStorefront.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
  	//return storefrontRef.getListingIDs()
      
    let ids = storefrontRef.getListingIDs()

    let collection = account.getCapability(PopmojiItem.CollectionPublicPath)
        .borrow<&{PopmojiItem.PopmojiItemCollectionPublic, NonFungibleToken.CollectionPublic}>()
            ?? panic("Collection Link Missing")

    let returnVals: [&NonFungibleToken.NFT] = []

    for id in ids {
        returnVals.append(collection.borrowNFT(id: id))
    }
    
    return returnVals
}

`;