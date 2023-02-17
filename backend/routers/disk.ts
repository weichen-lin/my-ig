import express from 'express'
import { auth_bearer_middleware } from './auth'
import { FolderCRUD, FileCRUD } from '../models'

const router = express.Router()

router.use(auth_bearer_middleware)
router.use(express.json())

router.get('/', async (req, res) => {
  const { current_folder } = req.query

  const user_id: string = res.locals.user_id

  const folders = await FolderCRUD.find(user_id, current_folder as string)

  const files = await FileCRUD.find(user_id, current_folder as string)

  res.status(200).json({
    folders: folders.map((e) => ({
      id: e.dataValues.folder_uuid,
      name: e.dataValues.folder_name,
      last_modified_at: e.dataValues.updatedAt
    })),
    files: files.map((e) => ({
      id: e.dataValues.file_uuid,
      name: e.dataValues.file_name,
      last_modified_at: e.dataValues.updatedAt,
      url: e.dataValues.file_url,
      description: e.dataValues.description,
      tags: e.dataValues.tags
    }))
  })
})

export default router
