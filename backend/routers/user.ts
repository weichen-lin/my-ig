import express from 'express'
import { userCRUD } from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User_CRUD_STATUS, Auth_STATUS } from '../errors'
import { OauthHelper } from '../utils/oauth'

interface createSignalReturn {
  status: User_CRUD_STATUS | undefined
  token?: string
}

const router = express.Router()

router.use(express.json())

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).json({ error: User_CRUD_STATUS.INVALID_BODY_FORMAT })
    }

    const sault = await bcrypt.genSalt()
    const password_hashed = bcrypt.hashSync(password, sault)

    const createSignal = await userCRUD.create(email, password_hashed, sault)
    let return_json: createSignalReturn = { status: createSignal }

    if (createSignal === User_CRUD_STATUS.SUCCESS) {
      const jwt_token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          email: email,
        },
        'SECRET_TOKEN'
      )
      return_json['token'] = jwt_token
      res.status(200).send(return_json)
    } else {
      res.status(401).send(return_json)
    }
  } catch {
    res.status(400).json({ error: User_CRUD_STATUS.INVALID_BODY_FORMAT })
  }
})

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

// https://github.com/login/oauth/authorize?client_id=6e7a0aec3433971e0008&scope=user:email
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

// router.get('/logout', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     if (!email || !password) {
//       res.status(408).json({ error: User_CRUD_STATUS.INVALID_BODY_FORMAT })
//     }

//     const sault = await bcrypt.genSalt()
//     const password_hashed = bcrypt.hashSync(password, sault)

//     const createSignal = await userCRUD.create(email, password_hashed, sault)
//     let return_json: createSignalReturn = { status: createSignal }

//     switch (createSignal) {
//       case User_CRUD_STATUS.SUCCESS:
//         const jwt_token = jwt.sign(
//           {
//             exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
//             email: email
//           },
//           'SECRET_TOKEN'
//         )
//         return_json['token'] = jwt_token
//         res.status(200).send({ status: 'SUCCESS', token: jwt_token })
//         break
//       case User_CRUD_STATUS.UNKNOWN_ERROR:
//         res.status(401).send(return_json)
//         break
//       case User_CRUD_STATUS.EMAIL_DUPLICATED:
//         res.status(401).send(return_json)
//         break
//       default:
//         res.status(401).send()
//         break
//     }
//   } catch (e) {
//     console.log(e)

//     res.status(400).json({ error: User_CRUD_STATUS.INVALID_BODY_FORMAT })
//   }
// })

export default router
