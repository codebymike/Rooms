import { config } from "@onflow/fcl"

config({
  "accessNode.api":     process.env.REACT_APP_ACCESS_NODE,
  "discovery.wallet":   process.env.REACT_APP_WALLET_DISCOVERY,
  //contracts
  "0xFungibleToken":    process.env.REACT_APP_FT_CONTRACT,
  "0xNonFungibleToken": process.env.REACT_APP_NFT_CONTRACT,
  "0xPopmojiCoin":      process.env.REACT_APP_POPMOJICOIN_CONTRACT,
  "0xPopmojiItem":      process.env.REACT_APP_POPMOJIITEM_CONTRACT,
  "0xNFTMarketplace":   process.env.REACT_APP_NFTMARKETPLACE_CONTRACT,
})