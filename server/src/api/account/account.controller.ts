import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account, USER_ROLE } from '../../mongodb/models/account.model.js'
import { getUuidFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import logger from '../../service/logger.service.js'
import { companyService } from '../company/company.service.js'
import { employeeService } from '../employee/employee.service.js'
import { profileService } from '../profile/profile.service.js'
import { accountService } from './account.service.js'

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

  const [
    updatedProfileData,
    updateEmployeeData,
    updatedCompanyData,
    updatedDepartmentData,
  ] = accountService.sortAccountData(accountData)

  const accountDoc = await accountService.getAccountDoc(uuid)
  if (!accountDoc) throw new BadRequestError('Cannot find account')

  const updatedProfile = await profileService.updateProfile(
    accountDoc.profile,
    updatedProfileData
  )
  if (!updatedProfile) {
    throw new BadRequestError('Cannot update profile')
  }

  const { companyName } = updatedCompanyData
  const { departmentName } = updatedDepartmentData
  const { position } = updateEmployeeData

  if (!companyName || !departmentName || !position) {
    throw new BadRequestError('Missing account data')
  }

  let company = await companyService.createCompany(companyName)
  if (!company) throw new BadRequestError('Cannot create company')
  let department = await departmentService.createDepartment(
    company._id,
    departmentName
  )
  if (!department) throw new BadRequestError('Cannot create department')

  company = await companyService.addDepartment(company._id, department._id)
  if (!company) throw new BadRequestError('Cannot add department to company')

  const employee = await employeeService.createEmployee(
    updatedProfile._id,
    company._id,
    department._id,
    position
  )

  if (!employee) throw new BadRequestError('Cannot create employee')
  company = await companyService.addEmployee(company._id, employee._id)
  if (!company) throw new BadRequestError('Cannot add an employee to company')

  department = await departmentService.addEmployee(department._id, employee._id)
  await accountService.connectEmployee(accountDoc._id, employee._id)

  // when creating a new company, set role to manager
  await accountService.setRole(accountDoc._id, USER_ROLE.manager)
  await accountService.setStatus(accountDoc._id, 'active')

  const completedAccount = await accountService.completeAccount(accountDoc._id)

  res.status(200).json({
    success: true,
    message: 'Account is ready to view',
    data: {
      account: completedAccount,
    },
  })
}

export async function joinCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uuid = getUuidFromALS()
  let account = await accountService.getAccount(uuid)
  if (!account) throw new BadRequestError('Cannot find account')
  const accountId = account._id

  const { companyNumber, employeeNumber } = req.body

  const company = await companyService.getCompanyDocByNumber(companyNumber)
  if (!company) {
    logger.warn(
      `accountController - joinCompany: company is not found, companyNumber ${companyNumber}`
    )

    res.status(200).json({
      success: false,
      message: 'Company is not found',
    })

    return
  }

  const employeeDoc = await companyService.getCompanyEmployeeDocByNumber(
    company._id,
    employeeNumber
  )
  if (!employeeDoc) {
    logger.warn(
      `accountController - joinCompany: employee is not found, company._id ${company._id}, employeeNumber ${employeeNumber}`
    )

    res.status(200).json({
      success: false,
      message: 'Employee is not found',
    })

    return
  }

  const profileId = employeeDoc.profile
  const employeeId = employeeDoc._id

  await accountService.setProfile(accountId, profileId)
  await accountService.connectEmployee(accountId, employeeId)
  await accountService.setRole(accountId, USER_ROLE.employee)

  // get updated account
  account = await accountService.getAccount(uuid)

  res.status(200).json({
    success: true,
    message: 'Account is ready to view',
    data: {
      account,
    },
  })
}

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uuid = getUuidFromALS()
  const account = await accountService.getAccount(uuid)

  res.status(200).json({
    success: true,
    message: 'Account is ready to view',
    data: {
      account,
    },
  })
}
