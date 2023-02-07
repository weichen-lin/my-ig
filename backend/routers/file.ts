import express from 'express'
import { auth_bearer_middleware } from './auth'
import multer from 'multer'
import { storage } from '../gcs'

const router = express.Router()

router.use(auth_bearer_middleware)
// router.use()
router.use(express.urlencoded({ extended: true }))
router.use(multer().single('myfile'))

router.get('/', (req, res) => {
  res.send('get requeset from router drive')
})

router.post('/', async (req, res) => {
  // console.log(req)
  // console.log(req.file?.buffer.toString())
  // console.log(req.file)
  const fileName = req.file?.originalname
  if (!fileName) {
    res.status(400).json({ status: 0 })
  }

  const bucket = storage.bucket('myigbucket')
  // .file(
  // Buffer.from(`${Date.now().toString()}_${fileName}`, 'latin1').toString(
  //   'utf8'
  // )
  // )
  // .createWriteStream({
  //   metadata: {
  //     contentType: req.file?.mimetype
  //   },
  //   predefinedAcl: 'publicRead'
  // })
  const publicFileName = `${Date.now().toString()}_${Buffer.from(
    `${Date.now().toString()}_${fileName}`,
    'latin1'
  ).toString('utf8')}`
  const blob = bucket.file(publicFileName)
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message })
  })

  blobStream.on('finish', async () => {
    // Create URL for directly file access via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

    try {
      // Make the file public
      await bucket.file(blob.name).makePublic()
    } catch {
      return res.status(500).send({
        message: `Uploaded the file successfully: ${blob.name}, but public access is denied!`,
        url: publicUrl
      })
    }

    res.status(200).send({
      message: 'Uploaded the file successfully: ' + blob.name,
      url: publicUrl
    })
  })

  blobStream.end(req.file?.buffer)
})

export default router
