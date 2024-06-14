import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bikeServices } from './bike.service'

const createBike = catchAsync(async (req, res) => {
  const result = await bikeServices.createBikeIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  })
})
const getAllBikes = catchAsync(async (req, res) => {
  const result = await bikeServices.getAllBikes()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  })
})
const updateSingleBike = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await bikeServices.updateSingleBikeIntoDB(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  })
})
const deleteSingleBike = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await bikeServices.deleteSingleBikeFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  })
})

export const bikeControllers = {
  createBike,
  getAllBikes,
  updateSingleBike,
  deleteSingleBike,
}
