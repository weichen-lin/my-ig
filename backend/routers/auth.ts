import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()
const JWT_TOKEN_SECRET = 'iamasecrettoken'

// router.use( )

const auth_middleware = (req: Request, res: Response, next: NextFunction) => {}

router.use(express.json())

router.get('/', (req, res) => {
  res.send('get requeset from router auth')
})

router.post('/', async (req, res) => {
  console.log(req.body)

  try {
    const { email, password } = req.body

    res.send('success')
  } catch {
    // res.sendStatus(402)
    res.send('hehe xd')
  }
})

export default router
