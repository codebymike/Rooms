import NonFungibleToken from 0xa2476927d1000eae
import FungibleToken from 0xa2476927d1000eae
import PopmojiItem from 0xa2476927d1000eae
import PopmojiCoin from 0xa2476927d1000eae

pub contract NFTMarketplace {

  pub struct SaleItem {
    pub let price: UFix64
    
    pub let nftRef: &PopmojiItem.NFT
    
    init(_price: UFix64, _nftRef: &PopmojiItem.NFT) {
      self.price = _price
      self.nftRef = _nftRef
    }
  }

  pub resource interface SaleCollectionPublic {
    pub fun getIDs(): [UInt64]
    pub fun getPrice(id: UInt64): UFix64
    pub fun purchase(id: UInt64, recipientCollection: &PopmojiItem.Collection{NonFungibleToken.CollectionPublic}, payment: @PopmojiCoin.Vault)
  }

  pub resource SaleCollection: SaleCollectionPublic {
    // maps the id of the NFT --> the price of that NFT
    pub var forSale: {UInt64: UFix64}
    pub let PopmojiItemCollection: Capability<&PopmojiItem.Collection>
    pub let PopmojiCoinVault: Capability<&PopmojiCoin.Vault{FungibleToken.Receiver}>

    pub fun listForSale(id: UInt64, price: UFix64) {
      pre {
        price >= 0.0: "It doesn't make sense to list a token for less than 0.0"
        self.PopmojiItemCollection.borrow()!.getIDs().contains(id): "This SaleCollection owner does not have this NFT"
      }

      self.forSale[id] = price
    }

    pub fun unlistFromSale(id: UInt64) {
      self.forSale.remove(key: id)
    }

    pub fun purchase(id: UInt64, recipientCollection: &PopmojiItem.Collection{NonFungibleToken.CollectionPublic}, payment: @PopmojiCoin.Vault) {
      pre {
        payment.balance == self.forSale[id]: "The payment is not equal to the price of the NFT"
      }

      recipientCollection.deposit(token: <- self.PopmojiItemCollection.borrow()!.withdraw(withdrawID: id))
      self.PopmojiCoinVault.borrow()!.deposit(from: <- payment)
      self.unlistFromSale(id: id)
    }

    pub fun getPrice(id: UInt64): UFix64 {
      return self.forSale[id]!
    }

    pub fun getIDs(): [UInt64] {
      return self.forSale.keys
    }

    init(_PopmojiItemCollection: Capability<&PopmojiItem.Collection>, _PopmojiCoinVault: Capability<&PopmojiCoin.Vault{FungibleToken.Receiver}>) {
      self.forSale = {}
      self.PopmojiItemCollection = _PopmojiItemCollection
      self.PopmojiCoinVault = _PopmojiCoinVault
    }
  }

  pub fun createSaleCollection(PopmojiItemCollection: Capability<&PopmojiItem.Collection>, PopmojiCoinVault: Capability<&PopmojiCoin.Vault{FungibleToken.Receiver}>): @SaleCollection {
    return <- create SaleCollection(_PopmojiItemCollection: PopmojiItemCollection, _PopmojiCoinVault: PopmojiCoinVault)
  }

  init() {

  }
}