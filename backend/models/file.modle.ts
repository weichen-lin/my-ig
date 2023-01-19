import { DataTypes, Sequelize } from 'sequelize'

export default function File(sequelize: Sequelize) {
  return sequelize.define('file', {
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
  })
}
