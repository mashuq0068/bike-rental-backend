import express from 'express'
import auth from '../../middlewares/auth'
import USER_ROLE from '../user/user.constant'
import zodValidation from '../../middlewares/zodValidation'
import { createBookingValidationSchema } from './booking.validation'
import { bookingControllers } from './booking.controller'
const router = express.Router()
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  zodValidation(createBookingValidationSchema),
  bookingControllers.createRental,
)
router.put('/:id/return', auth(USER_ROLE.admin), bookingControllers.returnBike)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingControllers.getAllRentals,
)
export const bookingRoutes = router
