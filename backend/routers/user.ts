import express from 'express'
import { userCRUD } from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User_CRUD_STATUS } from '../errors'

const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ error: 'invalid body format' })
    }

    const salut = await bcrypt.genSalt()
    const password_hashed = bcrypt.hashSync(password, salut)

    const createSignal = await userCRUD.create(email, password_hashed, salut)

    switch (createSignal) {
      case User_CRUD_STATUS.SUCCESS:
        const jwt_token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            email: email,
          },
          'SECRET_TOKEN'
        )
        res.cookie('_wclIG_', jwt_token)
        res.status(200).send({ status: 'SUCCESS' })
        break
      case User_CRUD_STATUS.UNKNOWN_ERROR:
        res.status(401).send({ status: 'UNKNOWN ERROR' })
        break
      case User_CRUD_STATUS.EMAIL_DUPLICATED:
        res.status(401).send({ status: 'Email duplicated' })
        break
      default:
        res.status(200).send()
        break
    }
  } catch {
    res.send('invalid body format')
  }
})

export default router
