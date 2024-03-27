import logo from '@/assets/logo/logo-50.png'
import { Box, SxProps, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type LogoProps = {
  sxImg?: SxProps
  sxText?: SxProps
}

const Logo: FC<LogoProps> = (props: LogoProps) => {
  const { sxImg, sxText } = props
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        ...sxImg,
        mr: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <img src={logo} alt='Logo Image' />
      <Typography
        variant='h5'
        noWrap
        component='a'
        href='/'
        sx={{
          ...sxText,
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        {t('labels.logo')}
      </Typography>{' '}
    </Box>
  )
}

export default Logo
