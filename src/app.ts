import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to meeting room booking system server')
})

export default app
