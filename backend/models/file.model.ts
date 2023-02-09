import { DataTypes } from 'sequelize'
import { db } from './db'

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
    }
  },
  {
    indexes: [{ fields: ['createdAt', 'locate_at'] }, { fields: ['user_uuid'] }]
  }
)

export const FileCRUD = {
  create: () => {},
  delete: () => {},
  find: () => {},
  update: () => {}
}
