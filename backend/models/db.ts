import { Sequelize } from 'sequelize'

const DB_CONFIG = {
  MYIG_DB_NAME: process.env.POSTGRES_DB ?? 'myig',
  MYIG_DB_USER: process.env.POSTGRES_USER ?? 'myig_user',
  MYIG_DB_PASSWORD:
    process.env.POSTGRES_PASSWORD ?? 'lb0OdlhZ2WjwxSB08ESjuykSHsnnB8mm',
  MYIG_DB_PORT: process.env.MYIG_DB_PORT ?? '5432',
  MYIG_DB_HOST:
    process.env.POSTGRES_HOST ??
    'dpg-ci42r8unqqlbd9ler3p0-a.singapore-postgres.render.com',
}

export const db = new Sequelize(
  `postgres://${DB_CONFIG.MYIG_DB_USER}:${DB_CONFIG.MYIG_DB_PASSWORD}@${DB_CONFIG.MYIG_DB_HOST}/${DB_CONFIG.MYIG_DB_NAME}?sslmode=no-verify`,
  {
    logging: false,
  }
)
