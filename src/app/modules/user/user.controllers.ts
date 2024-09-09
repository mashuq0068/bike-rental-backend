// import { JwtPayload } from 'jsonwebtoken'
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
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: result,
  })
})
const updateSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await userServices.updateSingleUserIntoDB(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users updated successfully',
    data: result,
  })
})
const deleteSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await userServices.deleteSingleUser(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users deleted successfully',
    data: result,
  })
})

export const userControllers = {
  getProfile,
  updateProfile,
  getAllUsers,
  updateSingleUser,
  deleteSingleUser
}
