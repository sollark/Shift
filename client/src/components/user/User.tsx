import { log } from '@/service/console.service'
import useUserStore from '@/stores/userStore'
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { getGuestMenu, getUserMenu } from './UserMenu'
import { useTranslation } from 'react-i18next'

const menu: Array<{ key: string; link: ReactNode }> = []

const User: FC = () => {
  log('User connected')

  const { t } = useTranslation()
  const defaultInitials = t('user_role.guest')
  const [initials, setInitials] = useState(defaultInitials)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const profile = useUserStore((state) => state.profile)

  useEffect(() => {
    // User menu
    menu.length = 0
    if (profile) menu.push(...getUserMenu())
    else menu.push(...getGuestMenu())

    // User initials
    if (profile && profile.firstName.length && profile.lastName.length)
      setInitials(
        profile.firstName[0].toUpperCase() + profile.lastName[0].toUpperCase()
      )
    else setInitials(defaultInitials)
  }, [profile, defaultInitials])

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: '5px' }}>
        <Avatar
          alt='Avatar'
          src=''
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            width: 45,
            height: 45,
            fontSize: 14,
          }}>
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        sx={{ mt: '60px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem.key} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{menuItem.link}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default User
