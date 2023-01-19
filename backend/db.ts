import { Sequelize } from 'sequelize'
import * as Models from './models'

const sequelize = new Sequelize(
  'postgres://postgres:yourasdasdaspassword@localhost:5432',
  { logging: false }
)

const models = Object.entries(Models)

models.forEach(([model_name, model]) => {
  console.log(`start sync model -> ${model_name}`)
  const currentModel = model(sequelize)
  currentModel
    .sync({ force: true })
    .then((e) => {
      console.log(e)
      console.log(`sync model ${model_name} success`)
    })
    .catch((e) => {
      console.log(e)
      console.log(`sync model ${model_name} failed`)
    })

  currentModel.create({})
})
