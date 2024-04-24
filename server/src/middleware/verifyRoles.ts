import { NextFunction, Request, Response } from 'express'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import { Role } from '../mongo/models/account.model.js'

function verifyRoles(...allowedRoles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const email = req.headers['X-User-Email'] as string

      //   let hasAccess = false
      //   if (!email) {
      //     return next(
      //       new UnauthorizedError(
      //         'You are not authorized to access this resource'
      //       )
      //     )
      //   }

      //   const userId = await userService.getUserId(email)
      //   const userRoles = await userService.getRoles(email)
      //   if (!userRoles) {
      //     return next(
      //       new UnauthorizedError(
      //         'You are not authorized to access this resource'
      //       )
      //     )
      //   }

      //   const roleCodes = Object.values(userRoles)
      //   allowedRoles.forEach((role) => {
      //     if (roleCodes.includes(role)) {
      //       hasAccess = true
      //     }
      //   })

      //   if (!hasAccess) {
      //     return next(
      //       new UnauthorizedError(
      //         'You are not authorized to access this resource'
      //       )
      //     )
      //   }

      next()
    } catch (error) {
      return next(
        new UnauthorizedError('You are not authorized to access this resource')
      )
    }
  }
}

export default verifyRoles
