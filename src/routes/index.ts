import express from 'express'

import { pfpAsiaRoutes } from './pfp-asia'

export const expressRoutes = express.Router()

expressRoutes.use('/pfp-asia', pfpAsiaRoutes)