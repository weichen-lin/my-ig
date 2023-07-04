import { Folder } from '../../models/folder.model'
import { BodyChecker } from '../util'

export default class FolderController {
  @BodyChecker({ name: 'string', locate_at: 'string' })
  public async createFolder(name: string, locate_at: string): Promise<[number, string]> {
    const checker = await Folder.findOne({
      where: {
        locate_at,
        name,
      },
    })

    if (checker) return [403, 'folder already exist!']

    try {
      const parent = await Folder.findOne({
        where: {
          folder_id: locate_at,
        },
      })
    } catch (e) {}

    return [201, 'OK']
  }
  // parse parent info
}
