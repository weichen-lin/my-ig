import config from './credential.json'
import * as admin from 'firebase-admin'
import { Request } from 'express'

export class FileController {
  public firebase: admin.app.App

  constructor() {
    this.firebase = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(JSON.stringify(config))),
      storageBucket: 'kushare-7abab.appspot.com',
    })
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

        resolve([201, url.toString()])
      })

      blobStream.end(req.file?.buffer)
    })
  }
}
