import { Request, Response, NextFunction } from 'express'
import { UserController } from '../controller/user/user'

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
