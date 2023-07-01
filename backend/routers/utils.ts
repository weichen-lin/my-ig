import { Request, Response, NextFunction } from 'express'
import { UserController } from '../controller/user'
import https from 'https'

interface CookieParser {
  cookie: string | undefined
  name: string
}

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

function CookieParser({ cookie, name }: CookieParser) {
  if (!cookie) return null
  const value = `; ${cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    const token = parts.pop()?.split(';').shift()
    return token
  }

  return null
}

const user = new UserController()

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization
  const [status, message] = user.verifyCookie(bearerHeader)
  if (status !== 200) {
    res.clearCookie('my-ig-token')
    return res.status(status).send(message)
  } else {
    res.locals.user_id = message
    next()
  }
}

export const assign_token = async (req: Request, res: Response) => {
  const cookie = req.headers.cookie
  const token = CookieParser({ cookie, name: 'my-ig-token' })
  if (!token) return [401, 'Unauthorized']
  const [status, message] = user.verifyJWTToken(token)
  if (status === 200) {
    return res.status(status).json({ token })
  } else {
    return res.status(status).send(message)
  }
}
