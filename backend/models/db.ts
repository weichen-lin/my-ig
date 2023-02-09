import { Sequelize } from 'sequelize'

const DB_CONFIG = {
  MYIG_DB_NAME: process.env.POSTGRES_DB ?? 'dev',
  MYIG_DB_USER: process.env.POSTGRES_USER ?? 'test',
  MYIG_DB_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'pwd',
  MYIG_DB_PORT: process.env.MYIG_DB_PORT ?? '5432',
  MYIG_DB_HOST: process.env.POSTGRES_HOST ?? 'host.docker.internal'
}

console.log(DB_CONFIG)

export const db = new Sequelize(
  `postgres://${DB_CONFIG.MYIG_DB_USER}:${DB_CONFIG.MYIG_DB_PASSWORD}@${DB_CONFIG.MYIG_DB_HOST}:${DB_CONFIG.MYIG_DB_PORT}/${DB_CONFIG.MYIG_DB_NAME}`,
  {
    logging: false
  }
)
