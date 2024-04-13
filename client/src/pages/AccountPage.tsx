import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountPage: FC = () => {
  log('AccountPage connected')

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Account Page</h1>
    </Box>
  )
}

export default AccountPage
