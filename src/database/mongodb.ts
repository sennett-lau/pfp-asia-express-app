import dotenv from 'dotenv'
import { Db, MongoClient } from 'mongodb'

dotenv.config()

export let PFPAsiaDB: Db

export const connectDB = async () => {
  if (PFPAsiaDB) {
    return
  }

  const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URI}`

  const client = new MongoClient(url, {
    w: 'majority',
  })

  await client.connect()

  PFPAsiaDB = client.db('PFPAsia')

  console.log('Connected to MongoDB')
}
