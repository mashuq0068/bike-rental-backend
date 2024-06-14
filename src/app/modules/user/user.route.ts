import express from 'express'
import { userControllers } from './user.controllers'
import auth from '../../middlewares/auth'
const router = express.Router()
router.get('/me', auth(), userControllers.getProfile)
export const userRoutes = router
