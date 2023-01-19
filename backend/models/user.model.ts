import { DataTypes, Sequelize } from 'sequelize'

export default function User(sequelize: Sequelize) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING(50)
    },
    email: { type: DataTypes.STRING(100) },
    password: { type: DataTypes.STRING(50) },
    validate_time: { type: DataTypes.DATE }
  })
}
