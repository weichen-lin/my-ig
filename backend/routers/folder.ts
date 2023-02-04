import express from 'express'
import { auth_bearer_middleware } from './auth'
import { Folder_CRUD_STATUS } from '../errors'
import { FolderCRUD } from '../models'

const router = express.Router()

router.use(auth_bearer_middleware)
router.use(express.json())

router.post('/', async (req, res) => {
  const { folder_name, current_folder } = req.body
  const user_id = res.locals.user_id

  if (!folder_name || !user_id) {
    res.status(401).json({ status: Folder_CRUD_STATUS.INVALID_BODY_FORMAT })
    return
  }
  try {
    const createSignal = await FolderCRUD.create(
      user_id,
      folder_name,
      current_folder
    )

    if (createSignal === Folder_CRUD_STATUS.SUCCESS) {
      res.status(200).send({ status: createSignal })
    } else {
      res.status(401).send({ status: createSignal })
    }
  } catch {
    res.status(400).json({ error: Folder_CRUD_STATUS.UNKNOWN_ERROR })
  }
})

export default router
