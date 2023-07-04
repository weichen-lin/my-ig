import express from 'express'
import { verify_token } from './utils'
const router = express.Router()

router.use(express.json())

router.get('/', verify_token, async (req, res) => {
  const user_id = res.locals.user_id

  const files = []
  const folders = []

  return res.status(200).json({ files, folders })
})

router.get('/breadcrumb', verify_token, async (req, res) => {
  const user_id = res.locals.user_id

  return res.status(200).send([])
})

export default router
