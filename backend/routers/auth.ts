import express from 'express'
import { expressjwt as JWT } from 'express-jwt'

const router = express.Router()
const JWT_TOKEN = 'iamasecrettoken'

router.get('/', (req, res) => {
  res.send('get requeset from router auth')
})

export default router
