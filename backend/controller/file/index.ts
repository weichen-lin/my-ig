import { credential, initializeApp } from 'firebase-admin'
import config from './credential.json'

const admin = initializeApp({
  credential: credential.cert(JSON.stringify(config)),
})

export class FileController {}
