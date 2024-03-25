import { v4 as uuidv4 } from 'uuid'
import authModel from '../mongo/models/auth.model'
import VisitorModel from '../mongo/models/visitor.model'

async function getAuthUuid(): Promise<string> {
  let isUnique = false
  let uuid = ''

  while (!isUnique) {
    uuid = uuidv4()
    const existingUuid = await authModel.findOne({ uuid })
    if (!existingUuid) isUnique = true
  }

  return uuid
}

async function getVisitorUuid(): Promise<string> {
  let isUnique = false
  let uuid = ''

  while (!isUnique) {
    uuid = uuidv4()
    const existingUuid = await VisitorModel.findOne({ publicId: uuid })
    if (!existingUuid) isUnique = true
  }

  return uuid
}

export const authService = {
  getAuthUuid,
  getVisitorUuid,
}
