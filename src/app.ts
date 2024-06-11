import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to meeting room booking system server')
})

export default app
