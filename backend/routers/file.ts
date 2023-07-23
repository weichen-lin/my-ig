import express from 'express'
import multer from 'multer'
import { FileController } from '../controller/file'
import { UserController } from '../controller/user'
import { verify_token, urlToBuffer } from './utils'

const router = express.Router()

const fileController = new FileController()
const userController = new UserController()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(multer().single('myfile'))

router.post('/', verify_token, async (req, res) => {
  const user_id = res.locals.user_id
  const [status, msg] = await fileController.uploadAvatarFile(user_id, req)

  if (status === 201) {
    const updateStatus = await userController.addAvatarUrl(user_id, msg)
    return res.status(updateStatus).send(msg)
  } else {
    return res.status(status).send(msg)
  }
})

router.post('/upload', verify_token, async (req, res) => {
  const user_id = res.locals.user_id
  const [status, msg] = await fileController.uploadDiskFile(user_id, req)

  if (status === 201) {
    const updateStatus = await userController.addAvatarUrl(user_id, msg)
    return res.status(updateStatus).send(msg)
  } else {
    return res.status(status).send(msg)
  }
})

router.get('/:id', async (req, res) => {
  // const user_id = res.locals.user_id
  const user_id = '93f5680f-513a-4196-a47b-065fe7867987'

  const url = await fileController.getFileUril(user_id, req.params.id)
  if (!url) return res.status(404).send('File not found')
  const buffer = await urlToBuffer(url)

  res.setHeader('Content-type', 'image/png')

  return res.status(200).send(buffer)
})

export default router
