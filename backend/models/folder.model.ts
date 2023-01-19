import { DataTypes, Sequelize } from 'sequelize'

export default function Folder(sequelize: Sequelize) {
  return sequelize.define('folder', {
    folder_uuid: {
      type: DataTypes.STRING(50)
    },
    folder_name: {
      type: DataTypes.STRING(100)
    },
    locate_at: {
      type: DataTypes.STRING(50)
    }
  })
}
