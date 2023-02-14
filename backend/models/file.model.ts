import { DataTypes } from 'sequelize'
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
) => {
  // make sure uuid is unique
  const new_file_uuid = uuidv4()
  const uuidChecker = await File.findOne({
    where: { file_uuid: new_file_uuid }
  })
  if (uuidChecker) {
    createFile(user_uuid, file_name, current_folder, file_url)
    return
  }

  // check file name unique
  const fileNameChecker = await File.findOne({
    where: {
      file_name: file_name,
      user_uuid: user_uuid
    }
  })

  if (fileNameChecker) return File_CRUD_STATUS.FILE_NAME_DUPLICATED

  try {
    await File.create({
      file_uuid: new_file_uuid,
      file_name: file_name,
      locate_at: current_folder ?? '',
      user_uuid: user_uuid,
      file_url: file_url
    })
    return File_CRUD_STATUS.SUCCESS
  } catch (e: any) {
    if (e?.name === 'SequelizeDatabaseError' && e?.parent?.code === '22001') {
      return File_CRUD_STATUS.FAILED
    }

    return File_CRUD_STATUS.FAILED
  }
}

const findFile = async (file_name: string, user_uuid: string) => {
  return await File.findOne({
    where: {
      file_name: file_name,
      user_uuid: user_uuid
    }
  })
}

export const FileCRUD = {
  create: createFile,
  delete: () => {},
  find: findFile,
  update: () => {}
}
