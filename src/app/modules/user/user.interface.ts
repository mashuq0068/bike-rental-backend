import { Model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'user' | 'admin'
}

export interface UserModelMethods extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
}
