import SecondaryButton from '@/cmps/button/SecondaryButton'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

type Props = {
  children?: any
  onClick: () => void
}

const NextButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props

  return (
    <SecondaryButton
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={onClick}>
      {children ? children : 'Next'}
    </SecondaryButton>
  )
}

export default NextButton
