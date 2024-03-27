import { log } from '@/service/console.service'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  log('CompanyDetailsFields connected')

  return (
    <div>
      <h2>Company</h2>
      <Input name='companyName' label='Company' type='text' />
      <Input name='departmentName' label='Department' type='text' />
      <Input name='position' label='Position' type='text' />
    </div>
  )
}

export default CompanyDetailsFields
