import express from 'express'
import { assign_token } from './utils'

const router = express.Router()

router.get('/', assign_token)

export default router
