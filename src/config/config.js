import { config } from "@onflow/fcl"

config({
  "app.detail.title":   "Popmoji:Rooms",
  "app.detail.icon":    "https://cdn.shopify.com/s/files/1/0067/8848/1114/files/popmoji-smile.jpg?v=1652869994",
  "accessNode.api":     process.env.REACT_APP_ACCESS_NODE,
  "discovery.wallet":   process.env.REACT_APP_WALLET_DISCOVERY,
  //contracts
  "0xFungibleToken":    process.env.REACT_APP_FT_CONTRACT,
  "0xNonFungibleToken": process.env.REACT_APP_NFT_CONTRACT,
  "0xPopmojiCoin":      process.env.REACT_APP_POPMOJICOIN_CONTRACT,
  "0xPopmojiItem":      process.env.REACT_APP_POPMOJIITEM_CONTRACT,
  "0xNFTStorefront":    process.env.REACT_APP_NFTSTOREFRONT_CONTRACT,
  "0xMetaDataViews":    process.env.REACT_APP_METADATAVIEWS_CONTRACT,
})