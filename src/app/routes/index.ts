import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { userRoutes } from '../modules/user/user.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
]
routes.forEach((route) => router.use(route.path, route.route))
export const allRoutes = router
