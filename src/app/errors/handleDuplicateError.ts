import httpStatus from 'http-status'

const handleDuplicateError = (err: any) => {
  const success = false
  const status = httpStatus.BAD_REQUEST
  const message = 'Duplicate error'
  const regex = /dup key: \{ (\w+): "([^"]+)" \}/
  const match = err?.errorResponse?.errmsg?.match(regex)
  const field = match[1]
  const value = match[2]
  const errorMessages = [
    {
      path: '',
      message: match
        ? `${field}: ${value} is a duplicate value`
        : 'Duplicate error',
    },
  ]
  return {
    success,
    status,
    message,
    errorMessages,
  }
}
export default handleDuplicateError
