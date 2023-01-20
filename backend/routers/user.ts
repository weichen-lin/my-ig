import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('get requeset from router user')
})

export default router
