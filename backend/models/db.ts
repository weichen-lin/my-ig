import { Sequelize } from 'sequelize'

export const db = new Sequelize(
  'postgres://postgres:yourasdasdaspassword@localhost:5432',
  { logging: false }
)
