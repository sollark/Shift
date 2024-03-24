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
import logger from '../../service/logger.service.js'
import { profileService } from '../profile/profile.service.js'

async function createAccount(uuid: string): Promise<Partial<Account>> {
  try {
    // Create an account
    const accountDoc = await AccountModel.create({ uuid })
    if (!accountDoc) {
      logger.warn(`accountService - cannot create account: ${uuid}`)
      throw new NotFoundError('Could not create account')
    }

    // Cast a document to an object
    const account = (await AccountModel.findById(
      accountDoc._id
    ).lean()) as Account
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

    logger.info(`accountService - getAccount, account fetched: ${account}`)

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
): Promise<Account> {
  try {
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      accountId,
      { role },
      // { new: true } // returns new version of document, if false returns original version, before updates
      { new: true }
    )
    if (!updatedAccount) {
      logger.warn(
        `accountService - updateRole, account is not found: ${accountId}`
      )
      throw new NotFoundError('Account is not found')
    }
    const account = await updatedAccount.lean().exec()

    return account
  } catch (error) {
    logger.error(`accountService - updateRole, error: ${error}`)
    throw new InternalServerError('Error updating account')
  }
}

async function setStatus(accountId: Types.ObjectId, status: Status) {
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    { status },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  ).exec()
}

async function connectEmployee(
  accountId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const profileId = await employeeService.getProfileId(employeeId)

  // TODO: check if employee is already assigned to another account
  // TODO: check if account has already assigned profile. Can be separate function to set profile
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $set: {
        employee: employeeId,
        profile: profileId,
        isComplete: true,
      },
    },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>({
      path: 'employee',
      populate: [
        {
          path: 'company',
          select: 'companyName companyNumber',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
        { path: 'profile' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })
    .populate<{ status: Status }>('status')
    .lean()
    .exec()

  return account
}

async function disconnectEmployee(accountId: Types.ObjectId) {
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $unset: {
        employee: 1,
        isComplete: false,
      },
    },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )

  logger.info(`accountService - disconnectEmployee, accountId: ${accountId}`)
}

async function completeAccount(
  accountId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const updatedAccount = await AccountModel.findByIdAndUpdate(
    accountId,
    { isComplete: true },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>({
      path: 'employee',
      populate: [
        {
          path: 'company',
          select: 'companyName companyNumber',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
        { path: 'profile' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })
    .populate<{ status: Status }>('status')
    .lean()
    .exec()

  if (!updatedAccount) {
    logger.warn(
      `accountService - completeAccount, cannot update account: ${accountId}`
    )
    throw new BadRequestError('Account cannot be updated')
  }

  logger.info(
    `accountService - completeAccount, account is completed: ${updatedAccount._id}`
  )

  return updatedAccount
}

async function updateAccount(
  accountId: Types.ObjectId,
  role: Role,
  status: Status
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    { role, status },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>({
      path: 'employee',
      select: '-profile -supervisor -subordinates',
      populate: [
        {
          path: 'company',
          select: 'companyName',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
      ],
    })
    .lean()
    .exec()

  logger.info(
    `accountService - updateAccount, account is updated: ${accountId}`
  )

  return account
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

function sortAccountData(
  accountData: any
): [
  updatedProfileData: Partial<Profile>,
  updateEmployeeData: Partial<Employee>,
  updatedCompanyData: Partial<Company>,
  updatedDepartmentData: Partial<Department>
] {
  // function usage:
  // const [
  //   updatedProfileData,
  //   updateEmployeeData,
  //   updatedCompanyData,
  //   updatedDepartmentData,
  // ] = accountService.sortAccountData(accountData)

  const profileSchemaKeys = Object.keys(ProfileModel.schema.paths)
  const employeeSchemaKeys = Object.keys(EmployeeModel.schema.paths)
  const companySchemaKeys = Object.keys(CompanyModel.schema.paths)
  const departmentSchemaKeys = Object.keys(DepartmentModel.schema.paths)

  const {
    updatedProfileData,
    updateEmployeeData,
    updatedCompanyData,
    updatedDepartmentData,
  } = Object.entries(accountData).reduce(
    (accumulator: any, [key, value]) => {
      if (profileSchemaKeys.includes(key)) {
        accumulator.updatedProfileData[key] = value
      } else if (employeeSchemaKeys.includes(key)) {
        accumulator.updateEmployeeData[key] = value
      } else if (companySchemaKeys.includes(key)) {
        accumulator.updatedCompanyData[key] = value
      } else if (departmentSchemaKeys.includes(key)) {
        accumulator.updatedDepartmentData[key] = value
      }
      return accumulator
    },
    {
      updatedProfileData: {},
      updateEmployeeData: {},
      updatedCompanyData: {},
      updatedDepartmentData: {},
    }
  )

  console.log('sortAccountData, updatedProfileData: ', updatedProfileData)
  console.log('sortAccountData, updateEmployeeData: ', updateEmployeeData)
  console.log('sortAccountData, updatedCompanyData: ', updatedCompanyData)
  console.log('sortAccountData, updatedDepartmentData: ', updatedDepartmentData)

  return [
    updatedProfileData as Partial<Profile>,
    updateEmployeeData as Partial<Employee>,
    updatedCompanyData as Partial<Company>,
    updatedDepartmentData as Partial<Department>,
  ]
}

export const accountService = {
  createAccount,
  getAccount,
  getAccounts,
  getAccountDoc,
  getEmployeeAccountDoc,
  setProfile,
  updateRole,
  setStatus,
  connectEmployee,
  disconnectEmployee,
  completeAccount,
  updateAccount,
  deleteAccount,
  sortAccountData,
}

// expanded logging:
// logger.info(
//   `accountService - createAccount, account is created:  ${JSON.stringify(
//     account,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
