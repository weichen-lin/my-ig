import express from 'express'
import { init_Models } from './models'
import { User, Folder, Disk, File, Auth } from './routers'
import { debug } from 'console'

const app = express()
const port = process.env.BACKEND_PORT ?? '8080'

init_Models()

true &&
  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Withcredentials')
    res.append('Access-Control-Allow-Credentials', 'true')
    next()
  })

app.use('/user', User)
app.use('/file', File)
app.use('/auth', Auth)
app.use('/folder', Folder)
app.use('/disk', Disk)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
