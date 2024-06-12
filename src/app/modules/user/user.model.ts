import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select:0
    },
    phone: {
      type: String,
      required: [true, 'phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    role: {
      type: String,
      required: [true, 'role is required'],
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid role',
      },
    },
  },
  {
    timestamps: true,
  },
)
userSchema.pre('save' , async function(next) {
    
})
export const User = model<IUser>('User', userSchema)

export default userSchema
