import { ZodError, ZodIssue } from 'zod'
import https from 'http-status'
import { TErrorMessage } from '../interface/errors'

const handleZodError = (err: ZodError) => {
  const success = false
  const message = err?.issues[0]?.message
  const status = https.BAD_REQUEST
  const errorMessages: TErrorMessage = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  return {
    success,
    message,
    status,
    errorMessages,
  }
}

export default handleZodError
