import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'

const getProfileFromDB = (payload:JwtPayload) => {
  const result = User.findOne({ email: payload?.email })
  return result
}
export const userServices = {
  getProfileFromDB,
}
