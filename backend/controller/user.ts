import { Request, Response } from 'express'
import { userCRUD } from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User_CRUD_STATUS, Auth_STATUS } from '../errors'
import { OauthHelper } from '../utils/oauth'
import { BodyChecker, ControllerReturnMsg } from './util'
import { User } from '../models/user.model'

const JWT_TOKEN_SECRET = 'SECRET_TOKEN'

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
      const mailDuplicateChecker = await User.findOne({
        where: { email: email },
      })
      if (mailDuplicateChecker) return [403, 'User Email duplicate']

      const sault = await bcrypt.genSalt()
      const password_hashed = bcrypt.hashSync(password, sault)

      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (!emailRegex.test(email)) return [403, 'Invalid Email format']

      const info = await User.create({
        email: email,
        password: password_hashed,
        sault: sault,
        login_method: 'Email',
      })

      return [200, info.dataValues.user_id]
    } catch (e) {
      return [500, 'Something wrong...']
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
}

const a = new UserController()

//
