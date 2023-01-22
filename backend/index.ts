import express, { Express, Request, Response } from 'express'
import { init_Models, userCRUD } from './models'
import { User, Auth, Drive } from './routers'

const app = express()
const port = '8080'

//https://ithelp.ithome.com.tw/articles/10202754

// init_Models()

app.use('/user', User)
app.use('/auth', Auth)
app.use('/drive', Drive)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
