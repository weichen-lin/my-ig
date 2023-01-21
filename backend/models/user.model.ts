import { DataTypes } from 'sequelize'
import { db } from './db'

export const User = db.define('user', {
  user_id: {
    type: DataTypes.STRING(50),
  },
  email: { type: DataTypes.STRING(100) },
  password: { type: DataTypes.STRING(50) },
  validate_time: { type: DataTypes.DATE },
})

export const userCRUD = {
  create: () => {},
  delete: () => {},
  find: () => {},
  update: () => {},
}
