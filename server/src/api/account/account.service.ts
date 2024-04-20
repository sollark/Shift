import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import InternalServerError from '../../errors/InternalServerError.js'
import NotFoundError from '../../errors/NotFoundError.js'
import AccountModel, {
  Account,
  AccountDoc,
  Role,
  Status,
} from '../../mongo/models/account.model.js'
import ProfileModel, { Profile } from '../../mongo/models/profile.model.js'
import { log } from '../../service/console.service.js'
import logger from '../../service/logger.service.js'

async function createAccount(uuid: string): Promise<Partial<Account>> {
  try {
    // Create an account
    const accountDoc = await AccountModel.create({ uuid })
    if (!accountDoc) {
      logger.warn(`accountService - cannot create account: ${uuid}`)
      throw new NotFoundError('Could not create account')
    }

    // Cast a document to an object
    const account = accountDoc.toObject() as Account
    if (!account) {
      logger.warn(`accountService - cannot get account: ${accountDoc._id}`)
      throw new NotFoundError('Could not get account')
    }

    logger.info(
      `accountService - createAccount, account is created:  ${account}`
    )

    return account
  } catch (error) {
    logger.error(`accountService - createAccount, error: ${error}`)
    throw new InternalServerError('Error creating account')
  }
}

async function getAccount(
  uuid: string
): Promise<Account & { _id: Types.ObjectId }> {
  try {
    const account = await AccountModel.findOne({ uuid })
      .populate<{ role: Role }>('role')
      .populate<{ profile: Profile }>('profile')
      .populate<{ status: Status }>('status')
      .lean()
      .exec()
    if (!account) {
      logger.warn(`accountService - getAccount, account is not found: ${uuid}`)
      throw new NotFoundError('Account is not found')
    }

    logger.info(
      `accountService - getAccount, account fetched: ${JSON.stringify(
        account,
        null,
        2 // Indentation level, adjust as needed
      )}`
    )

    return account
  } catch (error) {
    logger.error(`accountService - getAccount, error: ${error}`)
    throw new InternalServerError('Error getting account')
  }
}

async function getAccountDoc(uuid: string): Promise<AccountDoc> {
  try {
    const account = await AccountModel.findOne({ uuid })
    if (!account) {
      logger.warn(
        `accountService - getAccountDoc, account is not found: ${uuid}`
      )
      throw new BadRequestError('Account is not found')
    }

    return account
  } catch (error) {
    logger.error(`accountService - getAccountDoc, error: ${error}`)
    throw new InternalServerError('Error getting account doc')
  }
}

async function updateRole(
  accountId: Types.ObjectId,
  role: Role
): Promise<Account & { _id: Types.ObjectId }> {
  try {
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      accountId,
      { role },
      // { new: true } // returns new version of document, if false returns original version, before updates
      { new: true }
    )
      .populate<{ role: Role }>('role')
      .populate<{ profile: Profile }>('profile')
      .populate<{ status: Status }>('status')
      .lean()
      .exec()
    if (!updatedAccount) {
      logger.warn(
        `accountService - updateRole, account is not found: ${accountId}`
      )
      throw new NotFoundError('Account is not found')
    }

    return updatedAccount
  } catch (error) {
    logger.error(`accountService - updateRole, error: ${error}`)
    throw new InternalServerError('Error updating account')
  }
}

async function updateStatus(
  accountId: Types.ObjectId,
  status: Status
): Promise<Account & { _id: Types.ObjectId }> {
  try {
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      accountId,
      { status },
      // returns new version of document, if false returns original version, before updates
      { new: true }
    )
      .populate<{ role: Role }>('role')
      .populate<{ profile: Profile }>('profile')
      .populate<{ status: Status }>('status')
      .lean()
      .exec()
    if (!updatedAccount) {
      logger.warn(
        `accountService - updateStatus, account is not found: ${accountId}`
      )
      throw new NotFoundError('Account is not found')
    }

    return updatedAccount
  } catch (error) {
    logger.error(`accountService - updateStatus, error: ${error}`)
    throw new InternalServerError('Error updating account')
  }
}

async function updateAccount(
  accountId: Types.ObjectId,
  role: Role,
  status: Status
): Promise<Account & { _id: Types.ObjectId }> {
  try {
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      accountId,
      { role, status },
      // returns new version of document, if false returns original version, before updates
      { new: true }
    )
      .populate<{ role: Role }>('role')
      .populate<{ profile: Profile }>('profile')
      .populate<{ status: Status }>('status')
      .lean()
      .exec()
    if (!updatedAccount) {
      logger.warn(
        `accountService - updateAccount, account is not found: ${accountId}`
      )
      throw new NotFoundError('Account is not found')
    }

    logger.info(
      `accountService - updateAccount, account is updated: ${JSON.stringify(
        updatedAccount,
        null,
        2 // Indentation level, adjust as needed
      )}`
    )

    return updatedAccount
  } catch (error) {
    logger.error(`accountService - updateAccount, error: ${error}`)
    throw new InternalServerError('Error updating account')
  }
}

async function deleteAccount(accountId: Types.ObjectId) {
  await AccountModel.findByIdAndDelete({ accountId })
}

function sortAccountData(
  accountData: any
): [updatedProfileData: Partial<Profile>] {
  const profileSchemaKeys = Object.keys(ProfileModel.schema.paths)

  const { updatedProfileData } = Object.entries(accountData).reduce(
    (accumulator: any, [key, value]) => {
      if (profileSchemaKeys.includes(key)) {
        accumulator.updatedProfileData[key] = value
      }
      return accumulator
    },
    {
      updatedProfileData: {},
    }
  )

  log('sortAccountData, updatedProfileData: ', updatedProfileData)

  return [updatedProfileData as Partial<Profile>]
}

export const accountService = {
  createAccount,
  getAccount,
  getAccountDoc,
  updateRole,
  updateStatus,
  updateAccount,
  deleteAccount,
  sortAccountData,
}
