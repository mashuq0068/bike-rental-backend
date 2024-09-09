import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'
import { IUser } from './user.interface'

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
const getAllUsersFromDB = async() => {
  const result = await User.find()
  return result
}
const updateSingleUserIntoDB = async (id:string , payload:Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id , {$set : payload})
  return result
}
const deleteSingleUser = async (id:string) => {
  const result = await User.deleteOne({_id : id})
  return result
}
export const userServices = {
  getProfileFromDB,
  updateProfileFromDB,
  getAllUsersFromDB,
  updateSingleUserIntoDB,
  deleteSingleUser
}
