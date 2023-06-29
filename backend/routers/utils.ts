import { Request, Response, NextFunction } from 'express'
import { UserController } from '../controller/user'
import https from 'https'

export const urlToBuffer = (url: string) => {
  return new Promise((resolve, reject) => {
    const data: Uint8Array[] = []
    https.get(url, (res) => {
      res
        .on('data', (chunk: Uint8Array) => {
          data.push(chunk)
        })
        .on('end', () => {
          resolve(Buffer.concat(data))
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  })
}

const user = new UserController()

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization
  const [status, message] = user.verifyToken(bearerHeader)
  if (status !== 200) {
    res.clearCookie('my-ig-token')
    return res.status(status).send(message)
  } else {
    res.locals.user_id = message
    next()
  }
}
