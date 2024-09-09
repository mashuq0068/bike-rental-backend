/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'
import { User } from '../user/user.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { Bike } from '../bike/bike.model'
import moment from 'moment'
import mongoose from 'mongoose'

const createRentalIntoDB = async (userData: JwtPayload, payload: IBooking) => {
  const user = await User.findOne({ email: userData?.email })
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!')
  }
  const data = {
    ...payload,
    userId: user?._id,
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // const updateBikeAvailability =
    await Bike.findByIdAndUpdate(
      payload?.bikeId,
      {
        $set: {
          isAvailable: false,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    // if (!updateBikeAvailability) {
    //   await session.abortTransaction()
    //   await session.endSession()
    //   throw new AppError(
    //     httpStatus.BAD_REQUEST,
    //     'Something went wrong bike can not update',
    //   )
    // }
    const result = await Booking.create([data], { session })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (err: any) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, err.message)
  }
}

const returnBikeFromDB = async (id: string, payload: Partial<IBooking>) => {
  const rental = await Booking.findById(id)
  if (!rental) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No bike rental found!')
  }
  const rentedBike = await Bike.findById(rental?.bikeId)
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    await Bike.findByIdAndUpdate(
      rental?.bikeId,
      {
        $set: {
          isAvailable: true,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    const rentalStartTime = new Date(rental?.startTime)

    const rentalEndTime = payload?.returnTime
      ? moment(payload.returnTime, 'YYYY-MM-DD HH:mm A').isValid()
        ? moment(payload.returnTime, 'YYYY-MM-DD HH:mm A').toDate()
        : new Date() // Fallback if the date is invalid
      : new Date()

    const differenceInHours =
      (rentalEndTime?.getTime() - rentalStartTime.getTime()) / (1000 * 60 * 60)
     console.log(differenceInHours);
    const totalRentalCost = differenceInHours * Number(rentedBike?.pricePerHour)
    const result = await Booking.findByIdAndUpdate(
      id,
      {
        $set: {
          returnTime: rentalEndTime,
          totalCost: Math.ceil(totalRentalCost),
          isReturned: true,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Bike returning process failed for invalid data. Please try again!',
    )
  }
}

const getAllRentalsFromDB = async () => {
  const result = await Booking.find()
    .populate({ path: 'bikeId' })
    .populate({ path: 'userId' })
  return result
}
const getOwnBookingsFromDB = async (payload: JwtPayload) => {
  // Await the user result from findById
  const user = await User.findOne({ email: payload?.email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found!')
  }

  // Await the bookings result
  const paid = await Booking.find({
    userId: user._id,
    isPaid: true,
  }).populate('bikeId')
  const unPaid = await Booking.find({
    userId: user._id,
    isPaid: false,
    isReturned: true,
  }).populate('bikeId')

  return {
    paid,
    unPaid,
  }
}

const updateSingleBooking = async (id: string, payload: IBooking) => {
  const result = await Booking.findByIdAndUpdate(id, { $set: payload })
  return result
}

export const bookingServices = {
  createRentalIntoDB,
  getAllRentalsFromDB,
  returnBikeFromDB,
  getOwnBookingsFromDB,
  updateSingleBooking,
}
