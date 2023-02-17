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
    let id: string
    let status: Folder_CRUD_STATUS

    const createSignal = await FolderCRUD.create(
      user_id,
      folder_name,
      current_folder
    )

    id = createSignal.id
    status = createSignal.status

    while (createSignal.status === Folder_CRUD_STATUS.FOLDER_ID_DUPLICATED) {
      const createSignal = await FolderCRUD.create(
        user_id,
        folder_name,
        current_folder
      )

      id = createSignal.id
      status = createSignal.status
    }

    if (status === Folder_CRUD_STATUS.SUCCESS) {
      res.status(200).send({ status, id })
    } else {
      res.status(401).send({ status, id })
    }
  } catch {
    res.status(400).json({ error: Folder_CRUD_STATUS.UNKNOWN_ERROR })
  }
})

export default router
