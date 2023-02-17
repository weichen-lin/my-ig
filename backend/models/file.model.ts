import { DataTypes, Sequelize } from 'sequelize'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
import { File_CRUD_STATUS } from '../errors'

export const File = db.define(
  'file',
  {
    user_uuid: {
      type: DataTypes.STRING(50)
    },
    file_uuid: {
      type: DataTypes.STRING(50)
    },
    file_name: {
      type: DataTypes.STRING(100)
    },
    locate_at: {
      type: DataTypes.STRING(50)
    },
    file_url: {
      type: DataTypes.TEXT
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING(50))
    },
    description: {
      type: DataTypes.TEXT
    }
  },
  {
    indexes: [{ fields: ['createdAt', 'locate_at'] }, { fields: ['user_uuid'] }]
  }
)

const createFile = async (
  user_uuid: string,
  file_name: string,
  current_folder: string | null,
  file_url: string
): Promise<{ status: File_CRUD_STATUS; uuid: string }> => {
  // make sure uuid is unique
  const new_file_uuid = uuidv4()
  try {
    const uuidChecker = await File.findOne({
      where: { file_uuid: new_file_uuid }
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
        locate_at: current_folder
      }
    })
    if (fileNameChecker)
      return { status: File_CRUD_STATUS.FILE_NAME_DUPLICATED, uuid: '' }
  } catch {
    return { status: File_CRUD_STATUS.FAILED, uuid: '' }
  }

  try {
    await File.create({
      file_uuid: new_file_uuid,
      file_name: file_name,
      locate_at: current_folder ?? '',
      user_uuid: user_uuid,
      file_url: file_url
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
      locate_at: locate_at
    },
    order: [['updatedAt', 'DESC']]
  })
}

const checkFileExist = async (
  user_uuid: string,
  file_name: string,
  locate_at: string
) => {
  console.log(user_uuid, file_name, locate_at)
  return await File.findOne({
    where: {
      user_uuid: user_uuid,
      file_name: file_name,
      locate_at: locate_at
    }
  })
}

const updateFileDescription = async (
  user_uuid: string,
  file_uuid: string,
  description: string
) => {
  const target_file = await File.findOne({
    where: { file_uuid, user_uuid }
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

const updateTags = async (
  user_uuid: string,
  file_uuid: string,
  tag: string
) => {
  const target_file = await File.findOne({
    where: { file_uuid, user_uuid }
  })
  if (!target_file) {
    return File_CRUD_STATUS.FAILED
  }

  try {
    const tags = target_file.dataValues.tags ?? []
    console.log(target_file.dataValues.file_uuid)

    if (tags.length >= 5) {
      return File_CRUD_STATUS.NO_MORE_TAGS
    }
    console.log(`tags is `, tags)

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

export const FileCRUD = {
  create: createFile,
  delete: () => {},
  find: findFiles,
  check: checkFileExist,
  updateDesciption: updateFileDescription,
  updateTags: updateTags
}
