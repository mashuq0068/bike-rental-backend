import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { IBike } from './bike.interface'
import { Bike } from './bike.model'

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload)
  return result
}
const getAllBikes = async () => {
  const result = await Bike.find()
  return result
}
const updateSingleBikeIntoDB = async (id: string, payload: Partial<IBike>) => {
  const isBikeExist = await Bike.findById(id)
  if (!isBikeExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No bike found!')
  }
  const result = await Bike.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  )
  return result
}
const deleteSingleBikeFromDB = async (id: string) => {
  const isBikeExist = await Bike.findById(id)
  if (!isBikeExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No bike found!')
  }
  const result = await Bike.findByIdAndDelete(id)
  return result
}
export const bikeServices = {
  createBikeIntoDB,
  getAllBikes,
  updateSingleBikeIntoDB,
  deleteSingleBikeFromDB,
}
