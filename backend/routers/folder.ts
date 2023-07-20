import express from 'express'
import { Folder_CRUD_STATUS } from '../errors'
import FolderController from '../controller/folder'
import { verify_token } from './utils'

const router = express.Router()

const folderController = new FolderController()

router.use(express.json())

router.post('/', verify_token, async (req, res) => {
  const { folder_name, locate_at } = req.body

  const user_id = res.locals.user_id

  const [status, message] = await folderController.createFolder({ folder_name, locate_at, user_id })

  return res.status(status).send(message)
})

export default router
