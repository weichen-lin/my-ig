import express, { Express, Request, Response } from 'express'

const app = express()
const port = '8080'
//https://ithelp.ithome.com.tw/articles/10202754
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  console.log(res)
  next()
})

app.get('/', (req: Request, res: Response) => {
  console.log(Object.keys(req))
  console.log(req.rawHeaders)

  res.send('Express + TypeScript Server')
})

app.get('/test', (req: Request, res: Response) => {
  console.log([Object.entries(req)])

  res.send({ data: [123123123, 123123] })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
