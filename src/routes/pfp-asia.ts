import axios from 'axios'
import { Router } from 'express'
import { OPENSEA_API_URL, PFPASIA_CONTRACT_ADDRESS, PFPASIA_DATA_URL, PFPASIA_REDT1_TOTAL_SUPPLY } from '../config'
import { deletePFPAsiaNFTDataService, getPFPAsiaNFTDataService, insertPFPAsiaNFTDataService } from '../service'
import { INFTRawData } from '../types'

export const pfpAsiaRoutes = Router()

pfpAsiaRoutes.get('/nfts', async (req, res) => {
  const data = await getPFPAsiaNFTDataService()

  res.status(200).json({
    nftData: data,
    isAll: data.length === PFPASIA_REDT1_TOTAL_SUPPLY,
  })
})

pfpAsiaRoutes.get('/swappable', async (req, res) => {
  const chain = 'ethereum'
  const contractAddress = PFPASIA_CONTRACT_ADDRESS

  const header = {
    accept: 'application/json',
    'x-api-key': process.env.OPENSEA_API_KEY,
  }
  const resp = await axios.get(`${OPENSEA_API_URL}/chain/${chain}/contract/${contractAddress}/nfts`, {
    headers: header,
  })

  const nfts = resp.data.nfts

  const filtered = nfts.filter(
    (nft: any) =>
      nft.contract === contractAddress &&
      parseInt(nft.opensea_url.split('/')[nft.opensea_url.split('/').length - 1]) <= PFPASIA_REDT1_TOTAL_SUPPLY,
  )

  const tokenIds = filtered.map((nft: any) =>
    parseInt(nft.opensea_url.split('/')[nft.opensea_url.split('/').length - 1]),
  )

  res.status(200).json({ tokenIds })
})

pfpAsiaRoutes.get('/refresh', async (req, res) => {
  let existingData: INFTRawData[] = []

  while (existingData.length < PFPASIA_REDT1_TOTAL_SUPPLY) {
    try {
      let start = existingData.length + 1
      const batch = 500
      const end = PFPASIA_REDT1_TOTAL_SUPPLY

      while (start <= end) {
        const promises = []
        const endBatch = start + batch - 1 > end ? end : start + batch - 1

        console.log(`start: ${start}, end: ${endBatch}`)

        for (let i = start; i <= endBatch; i++) {
          promises.push(axios.get(`${PFPASIA_DATA_URL}/${i}`))
        }

        const batchData = await Promise.all(promises)

        const batchDataJson = batchData.map((d) => d.data)

        existingData = [...existingData, ...batchDataJson]

        start += batch
      }

      await deletePFPAsiaNFTDataService()
      await insertPFPAsiaNFTDataService(existingData)
    } catch (error) {
      console.log(`error fetching data`)
    }
  }

  res.status(200).json({ message: 'success' })
})
