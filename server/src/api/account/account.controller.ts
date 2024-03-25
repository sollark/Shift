import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import {
  ACCOUNT_STATUS,
  Account,
  USER_ROLE,
} from '../../mongo/models/account.model.js'
import { getUuidFromALS } from '../../service/als.service.js'
import logger from '../../service/logger.service.js'
import { profileService } from '../profile/profile.service.js'
import { accountService } from './account.service.js'
import InternalServerError from '../../errors/InternalServerError.js'

// TODO
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

// TODO every updateAccount creates a new profile, employee, company, department
// TODO make a correct flow to update account(when admin updates status), create new account(that is set to admin and active), and create new account with joinCompany(user, pending)
export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uuid = getUuidFromALS()
  const accountData: Account = req.body

  console.log('updateAccount, account: ', accountData)

  const [updatedProfileData] = accountService.sortAccountData(accountData)

  const accountDoc = await accountService.getAccountDoc(uuid)
  if (!accountDoc) throw new InternalServerError('Cannot find account')
  const { profile } = accountDoc
  if (!profile) throw new InternalServerError('Cannot find profile')

  const updatedProfile = await profileService.updateProfile(
    profile._id,
    updatedProfileData
  )
  if (!updatedProfile) {
    throw new BadRequestError('Cannot update profile')
  }

  let account = await accountService.updateRole(accountDoc._id, USER_ROLE.user)
  account = await accountService.updateStatus(
    accountDoc._id,
    ACCOUNT_STATUS.active
  )
  if (!account) {
    logger.error(
      `authService - updateAccount, cannot up[date] account for uuid: ${uuid}`
    )
    throw new BadRequestError('Cannot update account')
  }

  res.status(200).json({
    success: true,
    message: 'Account is ready to view',
    data: { account },
  })
}

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uuid = getUuidFromALS()
  const account = await accountService.getAccount(uuid)
  if (!account) {
    logger.error(
      `authService - getAccount, cannot find account for uuid: ${uuid}`
    )
    throw new InternalServerError('Cannot find account')
  }

  res.status(200).json({
    success: true,
    message: 'Account is ready to view',
    data: {
      account,
    },
  })
}
