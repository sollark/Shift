import AccentButton from '@/ui/button/AccentButton'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'
import { useTranslation } from 'react-i18next'

type Props = {
  children?: any
}

const SubmitButton: FC<Props> = (props: Props) => {
  const { children } = props

  const { t } = useTranslation()

  return (
    <AccentButton variant='contained' type='submit' sx={buttonStyle}>
      {children ? children : t('actions.submit')}
    </AccentButton>
  )
}

export default SubmitButton
