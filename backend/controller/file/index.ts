import config from './credential.json'
import * as admin from 'firebase-admin'
import { Request } from 'express'
import { File } from '../../models/file.model'

const firebase = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(config))),
  storageBucket: 'kushare-7abab.appspot.com',
})

export class FileController {
  public firebase: admin.app.App

  constructor() {
    this.firebase = firebase
  }

  public get bucket() {
    return this.firebase.storage().bucket()
  }

  public uploadAvatarFile = (user_id: string, req: Request): Promise<[number, string]> => {
    return new Promise((resolve, reject) => {
      const blob = this.firebase
        .storage()
        .bucket()
        .file(Buffer.from(`avatar/${user_id}/${req?.file?.originalname ?? 'unknown file'}`, 'latin1').toString('utf-8'))

      const blobStream = blob.createWriteStream()

      blobStream.on('error', (err) => {
        reject([400, err.message])
      })
      blobStream.on('finish', async () => {
        const url = await blob.getSignedUrl({
          action: 'read',
          expires: '12-31-2099',
        })

        console.log(url)

        resolve([201, url.toString()])
      })

      blobStream.end(req.file?.buffer)
    })
  }

  public uploadDiskFile = (user_id: string, req: Request): Promise<[number, string]> => {
    return new Promise((resolve, reject) => {
      const locate_at = req.body.locate_at === '' || !req.body.locate_at ? null : req.body.locate_at
      console.log(locate_at)
      const blob = this.firebase
        .storage()
        .bucket()
        .file(Buffer.from(`avatar/${user_id}/${req?.file?.originalname ?? 'unknown file'}`, 'latin1').toString('utf-8'))

      const blobStream = blob.createWriteStream()

      blobStream.on('error', (err) => {
        reject([400, err.message])
      })
      blobStream.on('finish', async () => {
        const url = await blob.getSignedUrl({
          action: 'read',
          expires: '12-31-2099',
        })

        const fileData = await File.create({
          user_id,
          file_name: Buffer.from(req?.file?.originalname ?? '未命名檔案', 'latin1').toString('utf-8'),
          file_url: url.toString(),
          locate_at,
        })

        resolve([201, fileData.dataValues.file_id])
      })

      blobStream.end(req.file?.buffer)
    })
  }

  public getFileUril = async (user_id: string, file_id: string) => {
    const file = await File.findOne({
      where: {
        user_id,
        file_id,
      },
    })

    if (file) return file.dataValues.file_url
    else return null
  }

  public getFiles = async (user_id: string, locate_at: string | null) => {
    const files = await File.findAll({
      where: {
        user_id,
        locate_at,
      },
    })

    return (
      files.map((file) => ({
        file_id: file.dataValues.file_id,
        file_name: file.dataValues.file_name,
      })) ?? []
    )
  }
}
