import { DataTypes } from 'sequelize'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
import { User_CRUD_STATUS } from '../errors'

export const User = db.define('user', {
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: { type: DataTypes.STRING(100), allowNull: false },
  password: { type: DataTypes.STRING(256), allowNull: false },
  sault: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  validate_time: { type: DataTypes.DATE },
  is_deleted: { type: DataTypes.BOOLEAN },
})

const createUser = async (email: string, password: string, sault: string) => {
  // make sure uuid is unique
  const new_user_uuid = uuidv4()
  const uuidChecker = await User.findOne({ where: { user_id: new_user_uuid } })
  if (uuidChecker) {
    createUser(email, password, sault)
    return
  }

  // check email unique
  const emailChecker = await User.findOne({ where: { email: email } })
  if (emailChecker) return User_CRUD_STATUS.EMAIL_DUPLICATED

  try {
    User.create({
      user_id: new_user_uuid,
      email: email,
      password: password,
      sault: sault,
    })
    return User_CRUD_STATUS.SUCCESS
  } catch {
    return User_CRUD_STATUS.UNKNOWN_ERROR
  }
}

const deleteUser = async (uuid: string) => {}

const findUser = async (email: string) => {
  return await User.findOne({
    where: { email: email },
  })
}

const updateUser = async (uuid: string) => {}

export const userCRUD = {
  create: createUser,
  delete: deleteUser,
  find: findUser,
  update: updateUser,
}
