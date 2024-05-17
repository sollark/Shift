import { NextFunction, Request, Response } from 'express'
import { getUuidFromALS } from '../../service/als.service.js'
import { accountService } from '../account/account.service.js'
import { profileService } from './profile.service.js'

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const profile = req.body
  const newProfile = await profileService.createProfile(profile)

  res.status(200).json({ newProfile })
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uuid = getUuidFromALS()
  const profileId = await accountService.getProfileId(uuid)
  const profile = await profileService.getProfile(profileId)

  res.status(200).json({ profile })
}

export async function getProfileByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ID } = req.body
  const profile = await profileService.getProfileByID(ID)

  res.status(200).json({ profile })
}
