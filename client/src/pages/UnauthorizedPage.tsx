import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const UnauthorizedPage: FC = () => {
  log('Unauthorized connected')

  return (
    <Box
      sx={{
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100vh',
        maxWidth: ['100%', '100%', '100%', '75%', '75%'],
        backgroundColor: 'primary.light',
      }}>
      <h1>You are not authorized</h1>
    </Box>
  )
}

export default UnauthorizedPage
