import express from 'express'
import { OauthHelper } from '../utils/oauth'
import { UserController } from '../controller/user/user'
import { Request, Response } from 'express'
import { verify_token } from './utils'

const user = new UserController()

const router = express.Router()

router.use(express.json())

const sign_jwt_token = async (req: Request, res: Response) => {
  const user_id = res.locals.user_id
  const token = user.assignToken(user_id)

  res.cookie('my-ig-token', token, {
    maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    httpOnly: true,
  })

  return res.status(200).send('OK')
}

router.get('/userinfo', verify_token, async (req, res) => {
  const [status, info] = await user.getUserInfo(res.locals.user_id)

  return res.status(status).json(info)
})

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
  sign_jwt_token
)

router.post(
  '/login',
  async (req, res, next) => {
    try {
      const [status, message] = await user.login(req.body)

      if (status === 200) {
        res.locals.user_id = message
        return next()
      } else {
        return res.status(401).send(message)
      }
    } catch (e) {
      return res.status(500).send(e)
    }
  },
  sign_jwt_token
)

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

router.delete('/logout', async (req, res) => {
  res.clearCookie('my-ig-token')
  return res.status(200).send('OK')
})

export default router
