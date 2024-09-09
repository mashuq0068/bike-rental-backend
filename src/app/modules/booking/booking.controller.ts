import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingServices } from './booking.service'

const createRental = catchAsync(async (req, res) => {
  const result = await bookingServices.createRentalIntoDB(req.user, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  })
})
const getOwnBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getOwnBookingsFromDB(req.user)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User profile retrieved successfully',
    data: result,
  })
})
const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await bookingServices.returnBikeFromDB(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  })
})
const getAllRentals = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllRentalsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  })
})
const updateSingleRental = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await bookingServices.updateSingleBooking(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental updated successfully',
    data: result,
  })
})
export const bookingControllers = {
  createRental,
  getAllRentals,
  returnBike,
  getOwnBookings,
  updateSingleRental,
}
