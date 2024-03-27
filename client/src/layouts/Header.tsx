import { FC } from 'react'
import Logo from '../ui/Logo'

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
