import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { userRoutes } from '../modules/user/user.route'
import { bikeRoutes } from '../modules/bike/bike.route'
import { bookingRoutes } from '../modules/booking/booking.route'

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
  {
    path: '/bikes',
    route: bikeRoutes,
  },
  {
    path: '/rentals',
    route: bookingRoutes,
  },
]
routes.forEach((route) => router.use(route.path, route.route))
export const allRoutes = router
