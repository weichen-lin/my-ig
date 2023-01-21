import { DataTypes } from 'sequelize'
import { db } from './db'

export const File = db.define('file', {
  file_uuid: {
    type: DataTypes.STRING(50),
  },
  file_name: {
    type: DataTypes.STRING(100),
  },
  locate_at: {
    type: DataTypes.STRING(50),
  },
  file_url: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING(50)),
  },
})

export const FileCRUD = {
  create: () => {},
  delete: () => {},
  find: () => {},
  update: () => {},
}
