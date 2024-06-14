import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'Not Found',
  })
}

export default notFound
