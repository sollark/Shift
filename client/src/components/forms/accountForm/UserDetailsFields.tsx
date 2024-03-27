import { log } from '@/service/console.service'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const UserDetailsFields: FC = () => {
  log('UserDetailsFields connected')

  return (
    <div>
      <h2>Profile</h2>
      <Input name='firstName' label='First name' type='text' />
      <Input name='lastName' label='Last name' type='text' />
      <Input name='ID' label='ID' type='text' />
    </div>
  )
}

export default UserDetailsFields
