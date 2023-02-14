import express from 'express'
import { auth_bearer_middleware } from './auth'
import multer from 'multer'
import { storage } from '../gcs'
import { File_CRUD_STATUS } from '../errors'
import { FileCRUD } from '../models'

const router = express.Router()

router.use(auth_bearer_middleware)
// router.use()
router.use(express.urlencoded({ extended: true }))
router.use(multer().single('myfile'))

router.get('/', (req, res) => {
  res.send('get requeset from router drive')
})

router.post('/', async (req, res) => {
  const file_name = req.file?.originalname
  const current_folder = req.body?.current_folder ?? ''

  if (!file_name) {
    return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
  }

  const user_id = res.locals.user_id
  const file_name_checker = await FileCRUD.find(file_name, user_id)

  if (file_name_checker)
    return res.status(500).send({ status: File_CRUD_STATUS.FAILED })

  const bucket = storage.bucket('myigbucket')

  const publicfile_name = `${Buffer.from(
    `${Date.now().toString()}_${file_name}`,
    'latin1'
  ).toString('utf8')}`
  const blob = bucket.file(`${user_id}/${publicfile_name}`)
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('error', (err) => {
    res.status(500).send({ status: File_CRUD_STATUS.FAILED })
  })

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    try {
      await bucket.file(blob.name).makePublic()

      await FileCRUD.create(user_id, file_name, current_folder, publicUrl)
    } catch {
      return res.status(500).send({
        status: File_CRUD_STATUS.FAILED
      })
    }

    res.status(200).send({
      url: publicUrl,
      status: File_CRUD_STATUS.SUCCESS
    })
  })

  blobStream.end(req.file?.buffer)
})

export default router
