import Logo from '@/components/Logo'
import { log } from '@/service/console.service'
import { FC } from 'react'

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
