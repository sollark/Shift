import { FC } from 'react'
import Logo from '../ui/Logo'
import { log } from '@/service/console.service'

const Header: FC = () => {
  log('Header is connected')

  return (
    <header
      style={{
        paddingBlock: '1rem',
        paddingInline: '2rem',
      }}>
      <Logo />
    </header>
  )
}

export default Header
