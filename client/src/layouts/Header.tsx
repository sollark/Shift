import Logo from '@/components/Logo'
import { log } from '@/service/console.service'
import LanguageSwitcher from '@/ui/languageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '@/ui/themeSwitcher/ThemeSwitcher'
import { FC } from 'react'

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: '1rem',
  paddingInline: '2rem',
}

const switchersStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
}

const Header: FC = () => {
  log('Header is connected')

  return (
    <header style={headerStyle}>
      <Logo />
      <div style={switchersStyle}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default Header
