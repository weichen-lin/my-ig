import { DataTypes } from 'sequelize'
import { db } from './db'

export const Folder = db.define('folder', {
  folder_uuid: {
    type: DataTypes.STRING(50),
  },
  folder_name: {
    type: DataTypes.STRING(100),
  },
  locate_at: {
    type: DataTypes.STRING(50),
  },
})

export const FolderCRUD = {
  create: () => {},
  delete: () => {},
  find: () => {},
  update: () => {},
}
