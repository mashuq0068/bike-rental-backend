import { ErrorRequestHandler } from 'express';
import { TErrorMessage } from '../interface/errors';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { AppError } from '../errors/AppError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import jwt from 'jsonwebtoken';

// Ensure that the 'TokenExpiredError' is imported if needed
// import { TokenExpiredError } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Something went wrong';
  let errorMessages: TErrorMessage = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.status || 500;
    message = simplifiedError?.message || 'Invalid request data';
    errorMessages = simplifiedError?.errorMessages || [];
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError?.status || 400;
    message = simplifiedError?.message || 'Validation failed';
    errorMessages = simplifiedError?.errorMessages || [];
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    status = simplifiedError?.status || 400;
    message = simplifiedError?.message || 'Invalid data format';
    errorMessages = simplifiedError?.errorMessages || [];
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError?.status || 409;
    message = simplifiedError?.message || 'Duplicate key error';
    errorMessages = simplifiedError?.errorMessages || [];
  } 
  else if (err instanceof jwt.TokenExpiredError) {
    // Handle JWT token expiration error specifically
    status = 401;
    message = 'JWT token expired';
    errorMessages = [
      {
        path: '',
        message: 'Your session has expired. Please log in again.',
      },
    ];
  } 
  else if (err instanceof AppError || err instanceof Error) {
    status = err instanceof AppError ? err?.status || 500 : 500;
    message = err?.message || 'An error occurred';
    errorMessages = [
      {
        path: '',
        message: err?.message || 'An error occurred',
      },
    ];
  }

  // Only include the stack trace in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    res.status(status).json({
      success: false,
      message,
      errorMessages,
      stack: err?.stack || '',
    });
  } else {
    res.status(status).json({
      success: false,
      message,
      errorMessages,
    });
  }
};

export default globalErrorHandler;
