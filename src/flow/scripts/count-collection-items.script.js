export const COUNT_ITEMS = `

    import PopmojiItem from 0xPopmojiItem
    import NonFungibleToken from 0xNonFungibleToken

    pub fun main(address: Address): Int {
        let account = getAccount(address)

        let collectionRef = account
            .getCapability(PopmojiItem.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
        
        return collectionRef.getIDs().length
    }
`