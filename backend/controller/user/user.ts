import { Request, Response } from 'express'
import { userCRUD } from '../../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User_CRUD_STATUS, Auth_STATUS } from '../../errors'
import { OauthHelper } from '../../utils/oauth'
import { BodyChecker, ControllerReturnMsg } from '../util'
import { User } from '../../models/user.model'
import { ErrorMsg } from './error'

const JWT_TOKEN_SECRET = 'SECRET_TOKEN'

declare module 'jsonwebtoken' {
  export interface MYIG_JwtPayload extends jwt.JwtPayload {
    exp: number
    user_id: string
  }
}

export class UserController {
  @BodyChecker({ email: 'string', password: 'string' })
  async register({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<ControllerReturnMsg> {
    try {
      const emailChecker = await User.findOne({
        where: { email: email },
      })
      if (emailChecker) return [403, ErrorMsg.EmailDuplicate.tw]

      const sault = await bcrypt.genSalt()
      const password_hashed = bcrypt.hashSync(password, sault)

      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (!emailRegex.test(email)) return [403, ErrorMsg.InvalidFormat.tw]

      const info = await User.create({
        email: email,
        password: password_hashed,
        sault: sault,
        login_method: 'Email',
      })

      return [200, info.dataValues.user_id]
    } catch (e) {
      return [500, ErrorMsg.UnknownError.tw]
    }
  }

  @BodyChecker({ email: 'string', password: 'string' })
  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<ControllerReturnMsg> {
    try {
      const emailChecker = await User.findOne({
        where: { email: email },
      })

      if (!emailChecker) return [401, ErrorMsg.LoginError.tw]

      const {
        password: password_already_hashed,
        sault,
        user_id,
      } = emailChecker.dataValues

      const password_hashed = bcrypt.hashSync(password, sault)
      if (password_already_hashed !== password_hashed) {
        return [401, ErrorMsg.LoginError.tw]
      }

      return [200, user_id]
    } catch (e) {
      return [500, ErrorMsg.UnknownError.tw]
    }
  }

  assignToken(user_id: string) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        user_id: user_id,
      },
      JWT_TOKEN_SECRET
    )
  }

  verifyToken(bearerHeader: string | undefined): [number, string] {
    if (!bearerHeader) {
      return [401, ErrorMsg.Unauthorized.tw]
    }

    const token = bearerHeader?.split('Bearer ')
    if (token.length !== 2) {
      return [401, ErrorMsg.Unauthorized.tw]
    }

    try {
      const jwt_payload = <jwt.MYIG_JwtPayload>(
        jwt.verify(token[1], JWT_TOKEN_SECRET)
      )

      const { exp, user_id } = jwt_payload
      if (exp * 1000 < Date.now()) {
        return [401, ErrorMsg.Unauthorized.tw]
      }

      if (user_id) {
        return [200, user_id]
      } else {
        return [401, ErrorMsg.Unauthorized.tw]
      }
    } catch {
      return [401, ErrorMsg.Unauthorized.tw]
    }
  }
}
