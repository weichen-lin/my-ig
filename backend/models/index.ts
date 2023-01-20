import File from './file.modle'
import Folder from './folder.model'
import User from './user.model'

import { Sequelize } from 'sequelize'

const Models = { File, Folder, User }

const sequelize = new Sequelize(
  'postgres://postgres:yourasdasdaspassword@localhost:5432',
  { logging: false }
)

const init_Models = async () => {
  const models = Object.entries(Models)

  models.forEach(async ([model_name, model]) => {
    const currentModel = model(sequelize)
    await currentModel.sync()
    console.log(`sync model ${model_name} success`)
  })
}

export { init_Models }
