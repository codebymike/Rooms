import NonFungibleToken from 0xa2476927d1000eae

pub contract PopmojiItem: NonFungibleToken {

  pub var totalSupply: UInt64
  
  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub resource NFT: NonFungibleToken.INFT {
    pub let id: UInt64 
    pub let ipfsHash: String
    pub var metadata: {String: String}

    init(_ipfsHash: String, _metadata: {String: String}) {
      self.id = PopmojiItem.totalSupply
      self.ipfsHash = _ipfsHash
      self.metadata = _metadata
    }
  }

  pub resource interface CollectionPublic {
    pub fun borrowEntireNFT(id: UInt64): &PopmojiItem.NFT
  }

  pub resource Collection: NonFungibleToken.Receiver, NonFungibleToken.Provider, NonFungibleToken.CollectionPublic, CollectionPublic {
    // the id of the NFT --> the NFT with that id
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

    pub fun deposit(token: @NonFungibleToken.NFT) {
      let myToken <- token as! @PopmojiItem.NFT
      emit Deposit(id: myToken.id, to: self.owner?.address)
      self.ownedNFTs[myToken.id] <-! myToken
    }

    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
      let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("This NFT does not exist")
      emit Withdraw(id: token.id, from: self.owner?.address)
      return <- token
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedNFTs.keys
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      return &self.ownedNFTs[id] as &NonFungibleToken.NFT
    }

    pub fun borrowEntireNFT(id: UInt64): &PopmojiItem.NFT {
      let reference = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
      return reference as! &PopmojiItem.NFT
    }

    init() {
      self.ownedNFTs <- {}
    }

    destroy() {
      destroy self.ownedNFTs
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <- create Collection()
  }

  // NFTMinter
  // Resource that an admin or something similar would own to be
  // able to mint new NFTs
  //
  pub resource NFTMinter {
      pub fun mintNFT(ipfsHash: String, metadata: {String: String}): @PopmojiItem.NFT {
          PopmojiItem.totalSupply = PopmojiItem.totalSupply + (1 as UInt64)
          return <- create NFT(_ipfsHash: ipfsHash, _metadata: metadata)
      }
  }


  init() {
    self.totalSupply = 0
    self.CollectionStoragePath = /storage/PopmojiItemCollection
    self.CollectionPublicPath = /public/PopmojiItemCollectionPublic
    self.AdminStoragePath = /storage/PopmojiItemAdmin
    // store a minter resource in account storage
    self.account.save(<-create NFTMinter(), to: /storage/PopmojiItemMinter)
  }
}