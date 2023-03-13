import express from 'express'
import { init_Models } from './models'
import { User, Auth, File, Folder, Disk } from './routers'

const app = express()
const port = process.env.BACKEND_PORT ?? '8080'

//https://ithelp.ithome.com.tw/articles/10202754

init_Models()

app.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 0 })
})

app.get('/', async (req, res) => {
  return res.status(200).json({ status: 0 })
})

app.use('/user', User)
app.use('/auth', Auth)
app.use('/file', File)
app.use('/folder', Folder)
app.use('/disk', Disk)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
