import { File, FileCRUD } from './file.model'
import { Folder, FolderCRUD } from './folder.model'
import { User, userCRUD } from './user.model'
// import Folder from './folder.model'

const Models = { User, File, Folder }

const init_Models = async () => {
  const models = Object.entries(Models)
  models.forEach(async ([model_name, model]) => {
    await model.sync({ alter: true })
    console.log(`sync model ${model_name} successs`)
  })

  User.hasOne(Folder, {
    onDelete: 'RESTRICT',
    foreignKey: {
      name: 'user_id',
    },
  })

  User.hasOne(File, {
    onDelete: 'RESTRICT',
    foreignKey: {
      name: 'user_id',
    },
  })

  Folder.hasOne(File, {
    onDelete: 'RESTRICT',
    foreignKey: {
      name: 'locate_at',
    },
  })

  Folder.hasOne(Folder, {
    onDelete: 'RESTRICT',
    foreignKey: {
      name: 'locate_at',
    },
  })
}

export { init_Models, userCRUD, FolderCRUD, FileCRUD }
