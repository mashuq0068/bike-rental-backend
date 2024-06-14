import { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../../utils/catchAsync'
import { userServices } from './user.service'
import sendResponse from '../../utils/sendResponse'

const getProfile = catchAsync(async (req, res) => {
  const result = await userServices.getProfileFromDB(req.user)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User profile retrieved successfully',
    data: result,
  })
})
const updateProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateProfileFromDB(req.user, req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Profile updated successfully',
    data: result,
  })
})
export const userControllers = {
  getProfile,
  updateProfile,
}
