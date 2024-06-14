import express from 'express'
import zodValidation from '../../middlewares/zodValidation'
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.validation'
import { bikeControllers } from './bike.controller'
import auth from '../../middlewares/auth'
import USER_ROLE from '../user/user.constant'
const router = express.Router()
router.post(
  '/',
  auth(USER_ROLE.admin),
  zodValidation(createBikeValidationSchema),
  bikeControllers.createBike,
)
router.get('/', bikeControllers.getAllBikes)
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  zodValidation(updateBikeValidationSchema),
  bikeControllers.updateSingleBike,
)
router.delete('/:id', auth(USER_ROLE.admin), bikeControllers.deleteSingleBike)
export const bikeRoutes = router
