import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountPage: FC = () => {
  log('AccountPage connected')

  // const profile = useProfileStore((state) => state.profile)

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Account Page</h1>
      <div>
        <h2>Profile</h2>
        {/* <p>First Name: {profile?.firstName}</p>
        <p>Last Name: {profile?.lastName}</p>
        <p>ID: {profile?.ID}</p> */}
      </div>
    </Box>
  )
}

export default AccountPage
