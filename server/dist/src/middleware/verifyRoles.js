import UnauthorizedError from '../errors/UnauthorizedError.js';
function verifyRoles(...allowedRoles) {
    return async (req, res, next) => {
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
            next();
        }
        catch (error) {
            return next(new UnauthorizedError('You are not authorized to access this resource'));
        }
    };
}
export default verifyRoles;
