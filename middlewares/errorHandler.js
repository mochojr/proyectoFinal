import HTTP_STATUS from '../helpers/httpStatus.js'
import { Prisma } from '@prisma/client'

const ERROR_HANDLERS = {
  validationError: (res, err) => {
    res
      .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      .json({
        success: false,
        message: 'validation error on request',
        error: err.message,
        isFromErrorHandler: true
      })
  },
  P2002: (res, err) => {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        success: false,
        message: 'fallo en uno o mas campos',
        error: err.message,
        isFromErrorHandler: true
      })
  },
  defaultError: (res, err) => {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message })
  }
}

const errorHandler = (err, _req, res, _next) => {
  let option = err.name
  if (err.isJoi) {
    option = 'validationError'
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    option = err.code
  }
  const handler = ERROR_HANDLERS[option] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
