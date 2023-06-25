import { File, FileCRUD } from './file.model'
import { Folder, FolderCRUD } from './folder.model'
import { User, userCRUD } from './user.model'

const Models = { User, File }

const init_Models = async () => {
  const models = Object.entries(Models)
  models.forEach(async ([model_name, model]) => {
    await model.sync({ alter: true })
    console.log(`sync model ${model_name} success`)
  })
}

export { init_Models, userCRUD, FolderCRUD, FileCRUD }
