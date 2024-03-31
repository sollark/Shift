import { log } from '@/service/console.service'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import { Box } from '@mui/material'
import { Outlet } from '@tanstack/react-router'

const RootPage = () => {
  log('RootPage is connected')

  return (
    <>
      <Header />
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
