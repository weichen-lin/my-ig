import { Folder } from '../../models/folder.model'
import { BodyChecker } from '../util'

interface createFolderProps {
  folder_name: string
  locate_at: string | null
  user_id: string
}

interface FolderElement {
  folder_id: string
  folder_name: string
  locate_at: string | null
  last_modified_at: Date
}

export default class FolderController {
  @BodyChecker({ folder_name: 'string', locate_at: 'string | null', user_id: 'string' })
  public async createFolder({ folder_name, user_id, locate_at }: createFolderProps): Promise<[number, string]> {
    if (!folder_name || folder_name === '') return [403, 'Invalid folder Name!']

    const checker = await Folder.findOne({
      where: {
        locate_at,
        folder_name,
        user_id,
      },
    })

    if (checker) return [403, 'folder already exist!']

    try {
      const haveParent = await Folder.findOne({
        where: {
          folder_id: locate_at,
          user_id,
        },
      })

      const newFolder = haveParent
        ? {
            user_id,
            folder_name,
            full_path: [
              ...haveParent.dataValues.full_path,
              { folder_id: haveParent.dataValues.folder_id, folder_name: haveParent.dataValues.folder_name },
            ],
            locate_at: haveParent.dataValues.folder_id,
          }
        : {
            user_id,
            folder_name,
            full_path: [],
            locate_at: null,
          }

      await Folder.create(newFolder)

      return [201, 'create success']
    } catch (e) {
      return [403, 'create failed']
    }
  }

  @BodyChecker({ locate_at: 'string | null', user_id: 'string' })
  public async getFolders({
    user_id,
    locate_at,
  }: {
    user_id: string
    locate_at: string | null
  }): Promise<FolderElement[]> {
    try {
      const folders = await Folder.findAll({
        where: {
          user_id,
          locate_at,
        },
        order: [['last_modified_at', 'DESC']],
      })

      return folders.map((folder) => ({
        folder_id: folder.dataValues.folder_id,
        folder_name: folder.dataValues.folder_name,
        locate_at: folder.dataValues.locate_at,
        last_modified_at: folder.dataValues.last_modified_at,
      }))
    } catch (e) {
      return Promise.reject(e)
    }
  }

  @BodyChecker({ folder_id: 'string | null', user_id: 'string' })
  public async getBreadCrumb({
    user_id,
    folder_id,
  }: {
    user_id: string
    folder_id: string | null
  }): Promise<FolderElement[]> {
    try {
      const breadCrumb = await Folder.findOne({
        where: {
          user_id,
          folder_id,
        },
      })

      const data =
        breadCrumb?.dataValues.full_path.map((folder: { folder_id: string; folder_name: string }) => ({
          folder_id: folder.folder_id,
          folder_name: folder.folder_name,
        })) ?? []

      if (folder_id) {
        data.unshift({ folder_id: breadCrumb?.dataValues.folder_id, folder_name: breadCrumb?.dataValues.folder_name })
      }

      return data
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
