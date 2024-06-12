import express from 'express'
import zodValidation from '../../middlewares/zodValidation'
import { createUserValidationSchema } from '../user/user.validation'
import { authControllers } from './auth.controller'
const router = express.Router()
router.post(
  '/signup',
//   zodValidation(createUserValidationSchema),
  authControllers.signUpUser,
)
export const authRoutes = router
