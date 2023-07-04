import { DataTypes, Transaction, literal } from 'sequelize'
import { db } from './db'

export const Folder = db.define(
  'folder',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    folder_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: literal(`uuid_generate_v4()`),
      primaryKey: true,
    },
    folder_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    locate_at: {
      type: DataTypes.UUID,
    },
    next_id: {
      type: DataTypes.UUID,
    },
    full_path: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    is_deleted: { type: DataTypes.BOOLEAN },
    create_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
    last_modified_at: { type: DataTypes.DATE, defaultValue: literal('now()') },
  },
  {
    indexes: [{ fields: ['create_at', 'locate_at'] }, { fields: ['user_id'] }],
    freezeTableName: true,
    timestamps: false,
  }
)
