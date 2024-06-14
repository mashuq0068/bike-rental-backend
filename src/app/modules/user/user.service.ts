import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'
import { IUser } from './user.interface'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const getProfileFromDB = (payload: JwtPayload) => {
  const result = User.findOne({ email: payload?.email })
  return result
}
const updateProfileFromDB = async (
  userData: JwtPayload,
  payload: Partial<IUser>,
) => {
  const result = await User.findOneAndUpdate(
    { email: userData?.email },
    payload,
    { new: true, runValidators: true },
  )
  
  return result
}
export const userServices = {
  getProfileFromDB,
  updateProfileFromDB
}
