import { DataTypes, literal } from 'sequelize'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'
import { User_CRUD_STATUS } from '../errors'

enum LOGIN_METHOD {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  GITHUB = 'Github',
  EMAIL = 'Email',
}

export const User = db.define(
  'user',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: literal(`uuid_generate_v4()`),
      primaryKey: true,
    },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(100) },
    sault: {
      type: DataTypes.STRING(50),
    },
    user_name: { type: DataTypes.STRING(100) },
    avatar_url: { type: DataTypes.TEXT },
    oauth_id: { type: DataTypes.STRING(100) },
    validate_time: { type: DataTypes.DATE },
    is_deleted: { type: DataTypes.BOOLEAN },
    login_method: { type: DataTypes.STRING(10) },
    create_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
    last_modified_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    freezeTableName: true,
    timestamps: false,
  }
)

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

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!emailRegex.test(email)) return User_CRUD_STATUS.INVALID_EAMIL_FORMAT

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
    attributes: ['user_id', 'email', 'password', 'sault'],
  })
}

const updateUser = async (uuid: string) => {}

export const userCRUD = {
  create: createUser,
  delete: deleteUser,
  find: findUser,
  update: updateUser,
}
