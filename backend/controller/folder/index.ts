import { Folder } from '../../models/folder.model'
import { BodyChecker } from '../util'

interface createFolderProps {
  folder_name: string
  locate_at: string | null
  user_id: string
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
}
