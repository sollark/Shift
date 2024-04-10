import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { Outlet } from '@tanstack/react-router'
import { FC } from 'react'
import Footer from './Footer'
import Main from './Main'
import ResponsiveAppBar from './ResponsiveAppBar'

const RootPage: FC = () => {
  log('RootPage is connected')

  return (
    <>
      <ResponsiveAppBar />
      <Main>
        <Box component='main' sx={{ flexGrow: 1, pt: 8 }}>
          <Outlet />
        </Box>
      </Main>
      <Footer />
    </>
  )
}

export default RootPage
