import express from 'express'
import multer from 'multer'
import { FileController } from '../controller/file'

const router = express.Router()

const firebase = new FileController()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(multer().single('myfile'))

router.post('/', async (req, res) => {
  const bucket = firebase.storage.bucket('test_bucket')
  const blob = firebase.bucket.file(
    Buffer.from(
      `avatar/test-user-id/${req?.file?.originalname}`,
      'latin1'
    ).toString('utf-8')
  )

  const blobStream = blob.createWriteStream()

  blobStream.on('error', (err) => {
    res.send({
      success: false,
      message: 'blobStream error',
    })
  })
  blobStream.on('finish', () => {
    // (3)
    const publicUrl = `https://storage.cloud.google.com/${
      bucket.name
    }/${encodeURIComponent(blob.name)}?hl=zh-tw`
  })
  // (4)
  blobStream.end(req.file?.buffer)

  return res.status(200).send('OK')
})

export default router
