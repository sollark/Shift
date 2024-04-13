import SecondaryButton from '@/ui/button/SecondaryButton'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonStyle } from '../style/formStyle'

type Props = {
  children?: any
  onClick: () => void
}

const NextButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props
  const { t } = useTranslation()

  return (
    <SecondaryButton
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={onClick}>
      {children ? children : t('navigation.next')}
    </SecondaryButton>
  )
}

export default NextButton
