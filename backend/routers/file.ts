import express from 'express'
import multer from 'multer'

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(multer().single('myfile'))

router.post('/', async (req, res) => {
  console.log(req?.file)
  console.log(req?.files)
  return res.status(200).send('OK')
})

export default router
