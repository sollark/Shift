// import { accountService } from '../api/account/account.service.js'
// import { authService } from '../api/auth/auth.service.js'
// import { companyService } from '../api/company/company.service.js'
// import { employeeService } from '../api/employee/employee.service.js'
// import { profileService } from '../api/profile/profile.service.js'
// import { departmentService } from '../service/department.service.js'
// import { USER_ROLE } from './models/account.model.js'

// async function populateTestData() {
//   console.log('Populating test data in the database...')

//   // register employee, manager, supervisor and admin
//   const { uuid: employeeUuid } = await authService.registration({
//     email: 'employee@test.com',
//     password: 'employee@',
//   })
//   const { uuid: managerUuid } = await authService.registration({
//     email: 'manager@test.com',
//     password: 'manager@',
//   })
//   const { uuid: supervisorUuid } = await authService.registration({
//     email: 'supervisor@test.com',
//     password: 'supervisor@',
//   })
//   const { uuid: adminUuid } = await authService.registration({
//     email: 'admin@test.com',
//     password: 'adminadmin@',
//   })

//   // Company
//   const company = await companyService.createCompany('Test Company')
//   if (!company) {
//     console.log('Failed to create company')
//     return
//   }

//   // Departments
//   const salesDepartment = await departmentService.createDepartment(
//     company._id,
//     'Sales'
//   )

//   const hrDepartment = await departmentService.createDepartment(
//     company._id,
//     'Human Resources'
//   )

//   const itDepartment = await departmentService.createDepartment(
//     company._id,
//     'Information Technology'
//   )

//   const productionDepartment = await departmentService.createDepartment(
//     company._id,
//     'Production'
//   )

//   const managementDepartment = await departmentService.createDepartment(
//     company._id,
//     'Management'
//   )

//   if (
//     !salesDepartment ||
//     !hrDepartment ||
//     !itDepartment ||
//     !productionDepartment ||
//     !managementDepartment
//   ) {
//     console.log('Failed to create department')
//     return
//   }

//   // Add departments to company
//   companyService.addDepartment(company._id, salesDepartment._id)
//   companyService.addDepartment(company._id, hrDepartment._id)
//   companyService.addDepartment(company._id, itDepartment._id)
//   companyService.addDepartment(company._id, productionDepartment._id)
//   companyService.addDepartment(company._id, managementDepartment._id)

//   // Manager, supervisor and admin profiles
//   const managerProfile = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Manager',
//     ID: '5555555555',
//   })
//   const supervisorProfile = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Supervisor',
//     ID: '6666666666',
//   })
//   const adminProfile = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Admin',
//     ID: '7777777777',
//   })
//   if (!managerProfile || !supervisorProfile || !adminProfile) {
//     console.log('Failed to create manager, supervisor and admin profiles')
//     return
//   }

//   // Employees' profiles
//   const profile1 = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Employee1',
//     ID: '1111111111',
//   })
//   const profile2 = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Employee2',
//     ID: '2222222222',
//   })
//   const profile3 = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Employee3',
//     ID: '3333333333',
//   })
//   const profile4 = await profileService.createProfile({
//     firstName: 'Test',
//     lastName: 'Employee4',
//     ID: '4444444444',
//   })
//   if (!profile1 || !profile2 || !profile3 || !profile4) {
//     console.log('Failed to create employee profiles')
//     return
//   }

//   // Create manager employee (production director)
//   const managerEmployee = await employeeService.createEmployee(
//     managerProfile._id,
//     company._id,
//     productionDepartment._id,
//     'Production Director'
//   )

//   // Create supervisor employee (factory director)
//   const supervisorEmployee = await employeeService.createEmployee(
//     supervisorProfile._id,
//     company._id,
//     managementDepartment._id,
//     'Factory Director'
//   )

//   // Create admin employee (IT)
//   const adminEmployee = await employeeService.createEmployee(
//     adminProfile._id,
//     company._id,
//     itDepartment._id,
//     'IT Specialist'
//   )

//   if (!managerEmployee || !supervisorEmployee || !adminEmployee) {
//     console.log('Failed to create employee')
//     return
//   }

//   // Create user employees
//   const employee1 = await employeeService.createEmployee(
//     profile1._id,
//     company._id,
//     salesDepartment._id,
//     'Sales Representative'
//   )
//   const employee2 = await employeeService.createEmployee(
//     profile2._id,
//     company._id,
//     hrDepartment._id,
//     'HR Manager'
//   )
//   const employee3 = await employeeService.createEmployee(
//     profile3._id,
//     company._id,
//     productionDepartment._id,
//     'Operator'
//   )
//   const employee4 = await employeeService.createEmployee(
//     profile4._id,
//     company._id,
//     productionDepartment._id,
//     'Operator'
//   )
//   if (!employee1 || !employee2 || !employee3 || !employee4) {
//     console.log('Failed to create employee')
//     return
//   }

//   // Add employees to company
//   await companyService.addEmployee(company._id, managerEmployee._id)
//   await companyService.addEmployee(company._id, supervisorEmployee._id)
//   await companyService.addEmployee(company._id, adminEmployee._id)
//   await companyService.addEmployee(company._id, employee1._id)
//   await companyService.addEmployee(company._id, employee2._id)
//   await companyService.addEmployee(company._id, employee3._id)
//   await companyService.addEmployee(company._id, employee4._id)

//   // Add employees to departments
//   await departmentService.addEmployee(salesDepartment._id, employee1._id)
//   await departmentService.addEmployee(hrDepartment._id, employee2._id)
//   await departmentService.addEmployee(productionDepartment._id, employee3._id)
//   await departmentService.addEmployee(productionDepartment._id, employee4._id)
//   await departmentService.addEmployee(
//     productionDepartment._id,
//     managerEmployee._id
//   )
//   await departmentService.addEmployee(
//     managementDepartment._id,
//     supervisorEmployee._id
//   )
//   await departmentService.addEmployee(itDepartment._id, adminEmployee._id)

//   // join employee's account to company employee
//   const employeeAccount = await accountService.getAccountDoc(employeeUuid)
//   if (employeeAccount) {
//     await accountService.setProfile(employeeAccount?._id, profile4._id)
//     await accountService.connectEmployee(employeeAccount?._id, employee4._id)
//     await accountService.setRole(employeeAccount?._id, USER_ROLE.employee)
//   } else {
//     console.log('Error in joining account to company')
//   }

//   // join manager's account to company manager
//   const managerAccount = await accountService.getAccountDoc(managerUuid)
//   if (managerAccount) {
//     await accountService.setProfile(managerAccount?._id, managerProfile._id)
//     await accountService.connectEmployee(
//       managerAccount?._id,
//       managerEmployee._id
//     )
//     await accountService.setRole(managerAccount?._id, USER_ROLE.manager)
//   } else {
//     console.log('Error in joining account to company')
//   }

//   // join supervisor's account to company supervisor
//   const supervisorAccount = await accountService.getAccountDoc(supervisorUuid)
//   if (supervisorAccount) {
//     await accountService.setProfile(
//       supervisorAccount?._id,
//       supervisorProfile._id
//     )
//     await accountService.connectEmployee(
//       supervisorAccount?._id,
//       supervisorEmployee._id
//     )
//     await accountService.setRole(supervisorAccount?._id, USER_ROLE.supervisor)
//   } else {
//     console.log('Error in joining account to company')
//   }

//   // join admin's account to company admin
//   const adminAccount = await accountService.getAccountDoc(adminUuid)
//   if (adminAccount) {
//     console.log(
//       'Setting profile to admin account:',
//       adminAccount?._id,
//       adminProfile._id
//     )
//     await accountService.setProfile(adminAccount?._id, adminProfile._id)
//     await accountService.connectEmployee(adminAccount?._id, adminEmployee._id)
//     await accountService.setRole(adminAccount?._id, USER_ROLE.admin)
//   } else {
//     console.log('Error in joining account to company')
//   }

//   console.log('Population completed')
// }

// export const populate = { populateTestData }
