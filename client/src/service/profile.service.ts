import { Profile } from '../models/Profile'
import {
  FailedResponse,
  SuccessfulResponse,
  httpService,
} from './axios/http.service'
import { log } from './console.service'

type ProfileData = {
  newProfile: Profile
}

// TODO Get a blank profile from server
async function createBlankProfile(profile: Profile): Promise<Profile | null> {
  const response = await httpService.post<ProfileData>(
    '/createBlankProfile',
    profile
  )

  const { success, message } = response
  if (!success) {
    log('profileService - createBlankProfile, message', message)
    return null
  }

  const data = getDataFromResponse(
    response,
    'profileService - createBlankProfile'
  )

  return data?.newProfile || null
}

export const profileService = {
  createBlankProfile,
}

function getDataFromResponse<T>(
  response: FailedResponse | SuccessfulResponse<T>,
  functionName: string
): T | null {
  if (!response) {
    log(`${functionName}, no response from the server`)
    return null
  }

  if (!response.success) {
    log(`${functionName}, error in response`, response.message)
    return null
  }

  return response.data || null
}
