import { DataTypes, Op } from 'sequelize'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
import { Folder_CRUD_STATUS } from '../errors'

export const Folder = db.define(
  'folder',
  {
    user_uuid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    folder_uuid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    folder_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    locate_at: {
      type: DataTypes.STRING(50)
    }
  },
  {
    indexes: [{ fields: ['createdAt', 'locate_at'] }, { fields: ['user_uuid'] }]
  }
)

const createFolder = async (
  user_uuid: string,
  folder_name: string,
  current_folder: string | null
) => {
  // make sure uuid is unique
  const new_folder_uuid = uuidv4()
  const uuidChecker = await Folder.findOne({
    where: { folder_uuid: new_folder_uuid }
  })
  if (uuidChecker) {
    createFolder(user_uuid, folder_name, current_folder)
    return
  }

  // check folder name unique
  const folderNameChecker = await Folder.findOne({
    where: {
      folder_name: folder_name,
      user_uuid: user_uuid
    }
  })

  if (folderNameChecker) return Folder_CRUD_STATUS.FOLDER_DUPLICATED

  const folderRegex = /[|\\/~^:,;?!&%$@*+]/
  if (folderRegex.test(folder_name))
    return Folder_CRUD_STATUS.INVALID_FOLDER_FORMAT

  try {
    const sql_res = await Folder.create({
      folder_uuid: new_folder_uuid,
      folder_name: folder_name,
      locate_at: current_folder ?? '',
      user_uuid: user_uuid
    })
    return Folder_CRUD_STATUS.SUCCESS
  } catch (e: any) {
    if (e?.name === 'SequelizeDatabaseError' && e?.parent?.code === '22001') {
      return Folder_CRUD_STATUS.FOLDER_NAME_TOOLONG
    }

    return Folder_CRUD_STATUS.UNKNOWN_ERROR
  }
}

const deleteFolder = async (uuid: string) => {}

const findFolder = async (
  user_uuid: string,
  [startDate, endDate]: [startDate: string, endDate: string],
  current_folder: string
) => {
  return await Folder.findAll({
    where: {
      user_uuid: user_uuid,
      locate_at: current_folder
    }
  })
}

const updateFolder = async (uuid: string) => {}

export const FolderCRUD = {
  create: createFolder,
  delete: deleteFolder,
  find: findFolder,
  update: updateFolder
}
