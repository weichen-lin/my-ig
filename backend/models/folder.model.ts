import { DataTypes, Transaction } from 'sequelize'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
import { Folder_CRUD_STATUS } from '../errors'

export const Folder = db.define(
  'folder',
  {
    user_uuid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    folder_uuid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    folder_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    locate_at: {
      type: DataTypes.STRING(50),
    },
  },
  {
    indexes: [
      { fields: ['createdAt', 'locate_at'] },
      { fields: ['user_uuid'] },
    ],
    freezeTableName: true,
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
    where: { folder_uuid: new_folder_uuid },
  })
  if (uuidChecker) {
    return { status: Folder_CRUD_STATUS.UNKNOWN_ERROR, id: '' }
  }

  // check folder name unique
  const folderNameChecker = await Folder.findOne({
    where: {
      folder_name: folder_name,
      user_uuid: user_uuid,
      locate_at: current_folder,
    },
  })

  if (folderNameChecker)
    return { status: Folder_CRUD_STATUS.FOLDER_ID_DUPLICATED, id: '' }

  const folderRegex = /[|\\/~^:,;?!&%$@*+]/
  if (folderRegex.test(folder_name))
    return { status: Folder_CRUD_STATUS.INVALID_FOLDER_FORMAT, id: '' }

  try {
    await Folder.create({
      folder_uuid: new_folder_uuid,
      folder_name: folder_name,
      locate_at: current_folder ?? '',
      user_uuid: user_uuid,
    })
    return {
      status: Folder_CRUD_STATUS.SUCCESS,
      id: new_folder_uuid,
    }
  } catch (e: any) {
    if (e?.name === 'SequelizeDatabaseError' && e?.parent?.code === '22001') {
      return {
        status: Folder_CRUD_STATUS.FOLDER_NAME_TOOLONG,
        id: '',
      }
    }
    console.log(e)
    return { status: Folder_CRUD_STATUS.UNKNOWN_ERROR, id: '' }
  }
}

const deleteFolder = async (uuid: string) => {}

const findFolder = async (user_uuid: string, current_folder: string) => {
  return await Folder.findAll({
    where: {
      user_uuid: user_uuid,
      locate_at: current_folder,
    },
    order: [['updatedAt', 'DESC']],
  })
}

const updateFolderLocateAt = async (
  folder_uuid_need_update: string,
  user_uuid: string,
  update_locate_at: string
) => {
  const target_folder = await Folder.findOne({
    lock: Transaction.LOCK.UPDATE,
    where: { folder_uuid: folder_uuid_need_update, user_uuid },
  })
  if (!target_folder) {
    return Folder_CRUD_STATUS.FAILED
  }

  try {
    target_folder.update(
      { locate_at: update_locate_at },
      { where: { user_uuid, folder_uuid: folder_uuid_need_update } }
    )
    return Folder_CRUD_STATUS.SUCCESS
  } catch {
    return Folder_CRUD_STATUS.FAILED
  }
}

export const FolderCRUD = {
  create: createFolder,
  delete: deleteFolder,
  find: findFolder,
  updateFolderLocateAt: updateFolderLocateAt,
}
