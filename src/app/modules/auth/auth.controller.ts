import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { User } from '../user/user.model'
import { authServices } from './auth.service'

const signUpUser = catchAsync(async (req, res, next) => {
  const result = await authServices.signUp(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})


export const authControllers = {
  signUpUser,
}
