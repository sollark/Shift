import { log } from '@/service/console.service'
import useEmployeeStore from '@/stores/employeeStore'
import useProfileStore from '@/stores/userStore'

import { FC } from 'react'
const AccountDetailsPage: FC = () => {
  log('AccountDetailsPage connected')

  const profile = useProfileStore((state) => state.profile)
  const employee = useEmployeeStore((state) => state.employee)

  return (
    <div>
      <h2>Profile</h2>
      <p>First Name: {profile?.firstName}</p>
      <p>Last Name: {profile?.lastName}</p>
      <p>ID: {profile?.ID}</p>
      <h2>Work details</h2>
      {employee && <p>Company: {employee.company.companyName}</p>}
      {employee && <p>Department: {employee.department.departmentName}</p>}
      {employee && <p>Position: {employee.position}</p>}
      {employee && <p>Employee number: {employee.employeeNumber}</p>}
    </div>
  )
}

export default AccountDetailsPage
