import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Auth_STATUS } from '../errors'
import { userCRUD } from '../models'

const router = express.Router()
const JWT_TOKEN_SECRET = 'SECRET_TOKEN'

declare module 'jsonwebtoken' {
  export interface MYIG_JwtPayload extends jwt.JwtPayload {
    exp: number
    email: string
    user_id: string
  }
}

const auth_bearer_middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization

  if (!bearerHeader) {
    res.status(401).send({ status: Auth_STATUS.NOT_AUTHORIZED })
    return
  }

  const token = bearerHeader?.split('Bearer ')
  if (token.length !== 2) {
    res.status(401).send({ status: Auth_STATUS.NOT_AUTHORIZED })
    return
  }

  try {
    const jwt_payload = <jwt.MYIG_JwtPayload>(
      jwt.verify(token[1], JWT_TOKEN_SECRET)
    )

    const { exp, email, user_id } = jwt_payload
    if (exp * 1000 < Date.now()) {
      res.status(401).send({ status: Auth_STATUS.NOT_AUTHORIZED })
      return
    }

    if (user_id) {
      next()
      return
    }

    const user_id_obj = await userCRUD.find(email)
    if (!user_id_obj) {
      res.status(401).send({ status: Auth_STATUS.NOT_AUTHORIZED })
      return
    }
    const jwt_token_with_ID = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        email: email,
        user_id: user_id_obj.dataValues.user_id,
      },
      JWT_TOKEN_SECRET
    )
    res.status(201).json({ token: jwt_token_with_ID })
  } catch {
    res.status(401).send({ status: Auth_STATUS.NOT_AUTHORIZED })
    return
  }
}

router.use(auth_bearer_middleware)

router.get('/', (req, res) => {
  res.status(200).json({ status: Auth_STATUS.AUTHORIZED })
})

export default router
