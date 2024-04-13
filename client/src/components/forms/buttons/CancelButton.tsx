import SecondaryButton from '@/ui/button/SecondaryButton'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'
import { useTranslation } from 'react-i18next'

type Props = {
  children?: any
  onClick: () => void
}

const CancelButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props
  const { t } = useTranslation()

  return (
    <SecondaryButton
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={onClick}>
      {children ? children : t('actions.cancel')}
    </SecondaryButton>
  )
}

export default CancelButton
