export const CREATE_LISTING = `

import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken

import PopmojiCoin from 0xPopmojiCoin
import PopmojiItem from 0xPopmojiItem
import NFTStorefront from 0xNFTStorefront

pub fun getOrCreateStorefront(account: AuthAccount): &NFTStorefront.Storefront {
    if let storefrontRef = account.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) {
        return storefrontRef
    }

    let storefront <- NFTStorefront.createStorefront()

    let storefrontRef = &storefront as &NFTStorefront.Storefront

    account.save(<-storefront, to: NFTStorefront.StorefrontStoragePath)

    account.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)

    return storefrontRef
}

transaction(saleItemID: UInt64, saleItemPrice: UFix64) {

    let coinReceiver: Capability<&PopmojiCoin.Vault{FungibleToken.Receiver}>
    let PopmojiItemProvider: Capability<&PopmojiItem.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefront.Storefront

    prepare(account: AuthAccount) {
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let PopmojiItemCollectionProviderPrivatePath = /private/PopmojiItemCollectionProvider

        self.coinReceiver = account.getCapability<&PopmojiCoin.Vault{FungibleToken.Receiver}>(/public/PopmojiCoinReceiver)!

        assert(self.coinReceiver.borrow() != nil, message: "Missing or mis-typed COIN receiver")

        if !account.getCapability<&PopmojiItem.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(PopmojiItemCollectionProviderPrivatePath)!.check() {
            account.link<&PopmojiItem.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(PopmojiItemCollectionProviderPrivatePath, target: PopmojiItem.CollectionStoragePath)
        }

        self.PopmojiItemProvider = account.getCapability<&PopmojiItem.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(PopmojiItemCollectionProviderPrivatePath)!

        assert(self.PopmojiItemProvider.borrow() != nil, message: "Missing or mis-typed PopmojiItem.Collection provider")

        self.storefront = getOrCreateStorefront(account: account)
    }

    execute {
        let saleCut = NFTStorefront.SaleCut(
            receiver: self.coinReceiver,
            amount: saleItemPrice
        )
        self.storefront.createListing(
            nftProviderCapability: self.PopmojiItemProvider,
            nftType: Type<@PopmojiItem.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@PopmojiCoin.Vault>(),
            saleCuts: [saleCut]
        )
    }
}

`;