import { Storage } from '@google-cloud/storage'
import credentail from './credential.json'

export const storage = new Storage({
  credentials: credentail
})
