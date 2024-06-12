import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { ILoginUser } from './auth.interface'

const signUp = async (payload: IUser) => {
  const result = await User.create(payload)
  const user = await User.findById(result?._id)
  return user
}
const login = async (payload: ILoginUser) => {

}
export const authServices = {
  signUp,
}
