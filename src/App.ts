import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { EXPRESS_PORT } from './config'
import { connectDB } from './database/mongodb'
import { expressRoutes } from './routes'

const startExpressApp = async () => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/api', expressRoutes)

  await connectDB()

  app.listen(EXPRESS_PORT, () => {
    console.log(`Express server listening on port ${EXPRESS_PORT}`)
  })
}

startExpressApp()
