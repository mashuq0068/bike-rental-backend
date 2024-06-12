import mongoose from 'mongoose'
import { TErrorMessage } from '../interface/errors'

const handleCastError = (err: mongoose.Error.CastError) => {
  const status = 400
  const message = 'invalid data request'
  const errorMessages: TErrorMessage = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]
  return {
    status,
    message,
    errorMessages,
  }
}
export default handleCastError
