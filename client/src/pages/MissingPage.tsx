import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const MissingPage: FC = () => {
  log('Missing connected')

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
      <h1>The page is not found!</h1>
    </Box>
  )
}

export default MissingPage
