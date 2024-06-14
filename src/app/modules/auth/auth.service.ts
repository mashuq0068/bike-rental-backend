import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { ILoginUser } from './auth.interface'
import jwt from 'jsonwebtoken'
import config from '../../config'

const signUp = async (payload: IUser) => {
  const result = await User.create(payload)
  const user = await User.findById(result?._id)
  return user
}
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email })
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid email.There is no user like that.',
    )
  }
  if (!(await User.isPasswordMatched(payload?.email, payload?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Your password dose not match')
  }
  const data = {
    email: payload?.email,
    password: payload?.password,
  }
  const token = jwt.sign(data, config.jwt_token_secret as string, {
    expiresIn: '2h',
  })
  return {
    token,
    user,
  }
}
export const authServices = {
  signUp,
  login,
}
