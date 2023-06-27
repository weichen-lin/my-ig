import config from './credential.json'
import * as admin from 'firebase-admin'

export class FileController {
  public firebase: admin.app.App

  constructor() {
    this.firebase = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(JSON.stringify(config))),
      storageBucket: 'kushare-7abab.appspot.com',
    })
  }

  public get storage() {
    return this.firebase.storage()
  }

  public get bucket() {
    return this.firebase.storage().bucket()
  }
}
