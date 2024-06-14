import { Schema, model } from 'mongoose'
import { IBooking } from './booking.interface'
import { Bike } from '../bike/bike.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
})
bookingSchema.pre('save', async function (next) {
  const bike = await Bike.findById(this?.bikeId)
  if (!bike) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Bike is invalid. No bike existed like that',
    )
  }
  const isBikeAvailable = bike.isAvailable
  if (!isBikeAvailable) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'The bike rental process is currently unavailable because the bike is already rented out.',
    )
  }
  next()
})
export const Booking = model<IBooking>('Booking', bookingSchema)
