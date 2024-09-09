import express from 'express'
import { userControllers } from './user.controllers'
import auth from '../../middlewares/auth'
import USER_ROLE from './user.constant'
import zodValidation from '../../middlewares/zodValidation'
import { updateUserValidationSchema } from './user.validation'
const router = express.Router()
router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  userControllers.getProfile,
)
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  zodValidation(updateUserValidationSchema),
  userControllers.updateProfile,
)
router.get('/', auth(USER_ROLE.admin), userControllers.getAllUsers)
router.patch('/:id', auth(USER_ROLE.admin), userControllers.updateSingleUser)
router.delete('/:id' , auth(USER_ROLE.admin) , userControllers.deleteSingleUser)
export const userRoutes = router
