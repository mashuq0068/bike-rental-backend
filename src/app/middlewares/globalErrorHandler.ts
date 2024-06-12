import { ErrorRequestHandler, Request } from 'express'
import { TErrorMessage } from '../interface/errors'
import config from '../config'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import { AppError } from '../errors/AppError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleValidationError from '../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500
  let message = 'something went wrong'
  let errorMessages: TErrorMessage = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    status = simplifiedError?.status
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    status = simplifiedError?.status
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  }
  // else if (err?.name === 'CastError') {
  //   const simplifiedError = handleCastError(err);
  //   status = simplifiedError?.statusCode;
  //   message = simplifiedError?.message;
  //   errorMessages = simplifiedError?.errorMessages;
  // }
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    status = simplifiedError?.status
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err instanceof AppError || err instanceof Error) {
    status = err instanceof AppError ? err?.status : 500
    message = err?.message
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  res.status(500).json({
    success: false,
    message,
    errorMessages,
    stack: err?.stack || '',
    err,
  })
}

export default globalErrorHandler
