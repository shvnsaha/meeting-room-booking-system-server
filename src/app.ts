import express, { Application } from 'express'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173','https://meeting-room-booking-system-client-steel.vercel.app'] ,credentials:true}))

app.get('/', (req, res) => {
  res.send('Welcome to meeting room booking system server')
})

// application routes
app.use('/api', router)

app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app
