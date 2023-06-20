import express from 'express'
import { init_Models } from './models'
import { User, Folder, Disk } from './routers'

const app = express()
const port = process.env.BACKEND_PORT ?? '8080'

init_Models()

true &&
  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    res.append('Access-Control-Allow-Credentials', 'true')
    next()
  })

app.get('/', async (req, res) => {
  return res.status(200).json({ status: 0 })
})

app.use('/user', User)

// app.use('/file', File)
// app.use('/folder', Folder)
// app.use('/disk', Disk)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
