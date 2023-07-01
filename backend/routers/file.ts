import express from 'express'
import multer from 'multer'
import { FileController } from '../controller/file'
import { UserController } from '../controller/user'
import { verify_token } from './utils'

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

// router.get('/', async (req, res) => {
//   const buffer = await urlToBuffer('')

//   res.setHeader('Content-type', 'image/jpeg')

//   return res.status(200).send(buffer)
// })

export default router
