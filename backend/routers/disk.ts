import express from 'express'
import { verify_token } from './utils'
import { FileController } from '../controller/file'
import FolderController from '../controller/folder'
const router = express.Router()

router.use(express.json())

// const fileController = new FileController()
const folderController = new FolderController()

router.get('/', verify_token, async (req, res) => {
  const user_id = res.locals.user_id
  const locate_at = (req.query.locate_at ?? null) as string | null

  const folders = await folderController.getFolders({ user_id, locate_at })
  const files = []

  return res.status(200).json({ files, folders })
})

router.get('/breadcrumb', verify_token, async (req, res) => {
  const user_id = res.locals.user_id

  return res.status(200).send([])
})

export default router
