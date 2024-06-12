import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/not-found'
import { allRoutes } from './app/routes'
const app: Application = express()
app.use(express.json())
app.use(cors())

// implement all routes
app.use('/api', allRoutes)
// test route
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json('app is running')
})
// global error handler
app.use(globalErrorHandler)
// not found route
app.use(notFound)

export default app
