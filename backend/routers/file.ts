// import express from 'express'
// import { auth_bearer_middleware } from './auth'
// import multer from 'multer'
// import { storage } from '../gcs'
// import { File_CRUD_STATUS } from '../errors'
// import { FileCRUD } from '../models'

// const router = express.Router()

// router.use(auth_bearer_middleware)
// router.use(express.urlencoded({ extended: true }))
// router.use(express.json())
// router.use(multer().single('myfile'))

// router.post('/', async (req, res) => {
//   const file_name = req.file?.originalname
//   const current_folder = req.body?.current_folder ?? ''
//   if (!file_name) {
//     return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
//   }

//   const user_id = res.locals.user_id
//   const file_name_checker = await FileCRUD.check(
//     user_id,
//     file_name,
//     current_folder
//   )

//   if (file_name_checker) {
//     return res
//       .status(402)
//       .send({ status: File_CRUD_STATUS.FILE_NAME_DUPLICATED })
//   }

//   const bucket = storage.bucket('myigbucket')

//   const publicfile_name = `${Buffer.from(
//     `${Date.now().toString()}_${file_name}`,
//     'latin1'
//   ).toString('utf8')}`

//   const file_name_utf8 = `${Buffer.from(file_name, 'latin1').toString('utf8')}`

//   const blob = bucket.file(`${user_id}/${publicfile_name}`)
//   const blobStream = blob.createWriteStream({
//     resumable: false
//   })

//   blobStream.on('error', (err) => {
//     res.status(500).send({ status: File_CRUD_STATUS.FAILED })
//   })

//   blobStream.on('finish', async () => {
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     try {
//       await bucket.file(blob.name).makePublic()
//       let status: File_CRUD_STATUS
//       let uuid: string

//       const { status: status_from_FileCRUD, uuid: uuid_from_FileCRUD } =
//         await FileCRUD.create(
//           user_id,
//           file_name_utf8,
//           current_folder,
//           publicUrl
//         )

//       status = status_from_FileCRUD
//       uuid = uuid_from_FileCRUD

//       while (status === File_CRUD_STATUS.FILE_ID_DUPLICATED) {
//         const { status: status_from_FileCRUD, uuid: uuid_from_FileCRUD } =
//           await FileCRUD.create(
//             user_id,
//             file_name_utf8,
//             current_folder,
//             publicUrl
//           )
//         status = status_from_FileCRUD
//         uuid = uuid_from_FileCRUD
//       }

//       if (status_from_FileCRUD === File_CRUD_STATUS.SUCCESS) {
//         res.status(200).send({
//           url: publicUrl,
//           status: status_from_FileCRUD,
//           id: uuid_from_FileCRUD
//         })
//       } else {
//         res.status(402).send({
//           status: status
//         })
//       }
//     } catch {
//       return res.status(500).send({
//         status: File_CRUD_STATUS.FAILED
//       })
//     }
//   })

//   blobStream.end(req.file?.buffer)
// })

// router.patch('/description', async (req, res) => {
//   const { description, id } = req.body

//   const user_id = res.locals.user_id

//   if (!id) {
//     return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
//   }

//   try {
//     FileCRUD.updateDesciption(user_id, id, description)
//     return res.status(200).json({ status: File_CRUD_STATUS.SUCCESS })
//   } catch {
//     return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
//   }
// })

// router.patch('/tag', async (req, res) => {
//   const { tag, id } = req.body

//   const user_id = res.locals.user_id

//   if (!id) {
//     return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
//   }

//   try {
//     const status = await FileCRUD.updateTags(user_id, id, tag)
//     if (status === File_CRUD_STATUS.SUCCESS) {
//       return res.status(200).json({ status: status })
//     }
//     return res.status(400).json({ status: status })
//   } catch {
//     return res.status(400).json({ status: File_CRUD_STATUS.FAILED })
//   }
// })

// router.patch('/locate', async (req, res) => {
//   const { update_locate_at, need_update } = req.body

//   console.log({ update_locate_at, need_update })
//   const user_id = res.locals.user_id

//   const status = FileCRUD.updateFileLocateAt(
//     need_update,
//     user_id,
//     update_locate_at
//   )

//   return res.status(200).json({ status })
// })

// export default router
