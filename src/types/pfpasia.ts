export interface INFTRawData {
  name: string
  image: string
}

export type APIPfpAsiaResData = {
  nftData: INFTRawData[]
  isAll: boolean
}

export type APIPfpAsiaSwappableResData = {
  tokenIds: number[]
}