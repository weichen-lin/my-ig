import express from 'express'
import { userCRUD } from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User_CRUD_STATUS, Auth_STATUS } from '../errors'
import { OauthHelper } from '../utils/oauth'
import { UserController } from '../controller/user'

interface createSignalReturn {
  status: User_CRUD_STATUS | undefined
  token?: string
}

const user = new UserController()

const router = express.Router()

router.use(express.json())

router.post(
  '/register',
  async (req, res, next) => {
    try {
      const [status, message] = await user.register(req.body)

      if (status === 200) {
        res.locals.user_id = message
        return next()
      } else {
        return res.status(403).send(message)
      }
    } catch (e) {
      return res.status(500).send(e)
    }
  },
  async (req, res) => {
    const user_id = res.locals.user_id
    const token = user.assignToken(user_id)

    res.cookie('my-ig-token', token, {
      maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      httpOnly: true,
    })

    return res.status(200).send('OK')
  }
)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).json({ status: Auth_STATUS.NOT_AUTHORIZED })
    }

    const userObj = await userCRUD.find(email)

    if (!userObj) {
      res.status(401).json({ status: Auth_STATUS.NOT_AUTHORIZED })
      return
    }

    const userInfo = { ...userObj.dataValues }

    const password_hashed = bcrypt.hashSync(password, userInfo.sault)
    if (userInfo.password === password_hashed) {
      const jwt_token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          email: userInfo.email,
          user_id: userInfo.user_id,
        },
        'SECRET_TOKEN'
      )
      res.status(200).json({ status: Auth_STATUS.AUTHORIZED, token: jwt_token })
    } else {
      res.status(401).json({ status: Auth_STATUS.NOT_AUTHORIZED })
    }
  } catch {
    res.status(400).json({ error: Auth_STATUS.UNKNOWN_ERROR })
  }
})

router.post('/oauth', async (req, res) => {
  const { platform, ...params } = req.body

  try {
    const oauth = new OauthHelper({ platform: platform, ...params })
    const user = await oauth.AuthGithub()

    console.log(user)
    res.status(200).send('test')
  } catch (e) {
    console.log(e)
    res.status(404).send('test')
    return
  }
})

export default router
