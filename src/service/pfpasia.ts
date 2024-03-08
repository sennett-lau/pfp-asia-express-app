import { PFPAsiaDB } from '../database/mongodb'
import { INFTRawData } from '../types'

export const getPFPAsiaNFTDataService = async (): Promise<INFTRawData[]> => {
  const collection = PFPAsiaDB.collection('PFPAsiaNFTData')

  const data = await collection.find({}).toArray()

  return data as any as INFTRawData[]
}

export const insertPFPAsiaNFTDataService = async (data: INFTRawData[]) => {
  const collection = PFPAsiaDB.collection('PFPAsiaNFTData')

  await collection.insertMany(data)
}

export const deletePFPAsiaNFTDataService = async () => {
  const collection = PFPAsiaDB.collection('PFPAsiaNFTData')

  await collection.deleteMany({})
}
