import express from 'express'
import { Folder_CRUD_STATUS } from '../errors'
import { FolderCRUD } from '../models'

const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  const { folder_name, current_folder } = req.body
  console.log({ folder_name, current_folder })
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
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: Folder_CRUD_STATUS.UNKNOWN_ERROR })
  }
})

router.patch('/locate', async (req, res) => {
  const { update_locate_at, need_update } = req.body

  const user_id = res.locals.user_id

  const status = FolderCRUD.updateFolderLocateAt(
    need_update,
    user_id,
    update_locate_at
  )

  return res.status(200).json({ status })
})

export default router
