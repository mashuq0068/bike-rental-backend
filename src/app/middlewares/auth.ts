import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { AppError } from '../errors/AppError'
import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { User } from '../modules/user/user.model'
import { TUserRole } from '../modules/user/user.interface'

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }
    const decoded = jwt.verify(
      token.split(' ')[1] as string,
      config.jwt_token_secret as string,
    ) as JwtPayload

    const user = await User.findOne({ email: decoded?.email })

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No user found!')
    }
    console.log(user?.role);
    if (roles && !roles.includes(user?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }
    req.user = decoded
    next()
  })
}
export default auth
