import { DataTypes, Sequelize, Transaction, literal } from 'sequelize'
import { db } from './db'
import { File_CRUD_STATUS } from '../errors'

export const File = db.define(
  'file',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    file_id: {
      type: DataTypes.UUID,
      defaultValue: literal(`uuid_generate_v4()`),
      primaryKey: true,
    },
    file_name: {
      type: DataTypes.STRING(100),
    },
    locate_at: {
      type: DataTypes.UUID,
    },
    file_url: {
      type: DataTypes.TEXT,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
    },
    description: {
      type: DataTypes.TEXT,
    },
    create_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
    last_modified_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
  },
  {
    indexes: [{ fields: ['create_at', 'locate_at'] }, { fields: ['user_id'] }],
    freezeTableName: true,
    timestamps: false,
  }
)

const createFile = async (
  user_uuid: string,
  file_name: string,
  current_folder: string | null,
  file_url: string
): Promise<{ status: File_CRUD_STATUS; uuid: string }> => {
  // make sure uuid is unique
  const new_file_uuid = 'asdas'
  try {
    const uuidChecker = await File.findOne({
      where: { file_uuid: new_file_uuid },
    })
    if (uuidChecker) {
      return { status: File_CRUD_STATUS.FILE_ID_DUPLICATED, uuid: '' }
    }
  } catch {
    return { status: File_CRUD_STATUS.FAILED, uuid: '' }
  }

  // check file name unique
  try {
    const fileNameChecker = await File.findOne({
      where: {
        file_name: file_name,
        user_uuid: user_uuid,
        locate_at: current_folder,
      },
    })
    if (fileNameChecker) return { status: File_CRUD_STATUS.FILE_NAME_DUPLICATED, uuid: '' }
  } catch {
    return { status: File_CRUD_STATUS.FAILED, uuid: '' }
  }

  try {
    await File.create({
      file_uuid: new_file_uuid,
      file_name: file_name,
      locate_at: current_folder ?? '',
      user_uuid: user_uuid,
      file_url: file_url,
    })
    return { status: File_CRUD_STATUS.SUCCESS, uuid: new_file_uuid }
  } catch {
    return { status: File_CRUD_STATUS.FAILED, uuid: '' }
  }
}

const findFiles = async (user_uuid: string, locate_at: string) => {
  return await File.findAll({
    where: {
      user_uuid: user_uuid,
      locate_at: locate_at,
    },
    order: [['updatedAt', 'DESC']],
  })
}

const checkFileExist = async (user_uuid: string, file_name: string, locate_at: string) => {
  return await File.findOne({
    where: {
      user_uuid: user_uuid,
      file_name: file_name,
      locate_at: locate_at,
    },
  })
}

const updateFileDescription = async (user_uuid: string, file_uuid: string, description: string) => {
  const target_file = await File.findOne({
    where: { file_uuid, user_uuid },
  })

  if (!target_file) {
    return File_CRUD_STATUS.FAILED
  }

  try {
    target_file.update({ description }, { where: { user_uuid, file_uuid } })
    return File_CRUD_STATUS.SUCCESS
  } catch {
    return File_CRUD_STATUS.FAILED
  }
}

const updateTags = async (user_uuid: string, file_uuid: string, tag: string) => {
  const target_file = await File.findOne({
    where: { file_uuid, user_uuid },
  })
  if (!target_file) {
    return File_CRUD_STATUS.FAILED
  }

  try {
    const tags = target_file.dataValues.tags ?? []

    if (tags.length >= 5) {
      return File_CRUD_STATUS.NO_MORE_TAGS
    }

    if (!tags.includes(tag)) {
      target_file.update(
        { tags: Sequelize.fn('array_append', Sequelize.col('tags'), tag) },
        { where: { user_uuid, file_uuid } }
      )
      return File_CRUD_STATUS.SUCCESS
    }
    return File_CRUD_STATUS.TAG_ALREADY_HAVE
  } catch {
    return File_CRUD_STATUS.FAILED
  }
}

const updateFileLocateAt = async (file_uuid_need_update: string, user_uuid: string, update_locate_at: string) => {
  const target_file = await File.findOne({
    lock: Transaction.LOCK.UPDATE,
    where: { file_uuid: file_uuid_need_update, user_uuid },
  })
  if (!target_file) {
    return File_CRUD_STATUS.FAILED
  }

  try {
    target_file.update({ locate_at: update_locate_at }, { where: { user_uuid, file_uuid: file_uuid_need_update } })
    return File_CRUD_STATUS.SUCCESS
  } catch {
    return File_CRUD_STATUS.FAILED
  }
}

export const FileCRUD = {
  create: createFile,
  delete: () => {},
  find: findFiles,
  check: checkFileExist,
  updateDesciption: updateFileDescription,
  updateTags,
  updateFileLocateAt,
}
