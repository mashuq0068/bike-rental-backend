import { Model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'user' | 'admin'
}

export interface IUserModelMethods extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
  isPasswordMatched(email: string, password: string): Promise<boolean>
}
