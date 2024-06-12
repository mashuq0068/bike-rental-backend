import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { TErrorMessage } from '../interface/errors'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const status = httpStatus.BAD_REQUEST
  const message = 'validation error'
  const errorMessages: TErrorMessage = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )
  return {
    status,
    message,
    errorMessages,
  }
}

export default handleValidationError
