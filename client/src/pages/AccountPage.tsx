import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { Outlet } from '@tanstack/react-router'

const AccountPage = () => {
  log('AccountPage connected')

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Account Page</h1>
      <Outlet />
    </Box>
  )
}

export default AccountPage
