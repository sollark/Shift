import { IconButton } from '@mui/material'
import { default as Icon } from '@mui/icons-material/Menu'

type MenuIconProps = {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
}

const MenuIcon = (props: MenuIconProps) => {
  const { handleOpenNavMenu } = props

  return (
    <IconButton
      size='large'
      aria-label='account of current user'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={handleOpenNavMenu}
      color='inherit'>
      <Icon />
    </IconButton>
  )
}

export default MenuIcon
