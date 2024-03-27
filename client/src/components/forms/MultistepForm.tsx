import { useMultistepForm } from '@/hooks/useMultistepForm'
import { router } from '@/routes/router'
import { log } from '@/service/console.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import BackButton from './buttons/BackButton'
import CancelButton from './buttons/CancelButton'
import NextButton from './buttons/NextButton'
import SubmitButton from './buttons/SubmitButton'
import { MultistepFormProvider } from './context/MultistepFormContext'

type Props = {
  children: ReactElement[]
  schema: any
  defaultValues: any
  submit: (data: any) => void
  [key: string]: any // allow any other prop that is not explicitly defined
}

const MultistepForm: FC<Props> = (props: Props) => {
  log('MultistepForm connected')

  const navigateBack = router.history.back

  const { children, schema, defaultValues, submit, ...rest } = props

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { handleSubmit } = methods
  const onSubmit = (data: any) => submit(data)

  const { step, steps, back, next, currentStepIndex, isFirstStep, isLastStep } =
    useMultistepForm([...children])

  return (
    <FormProvider {...methods}>
      <MultistepFormProvider goToPreviousStep={back} goToNextStep={next}>
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
          {currentStepIndex + 1} / {steps.length}
          {step}
          <div className='flex space-between'>
            {isFirstStep ? null : <BackButton onClick={back} />}
            {<CancelButton onClick={navigateBack} />}
            {isLastStep ? <SubmitButton /> : <NextButton onClick={next} />}
          </div>
        </form>
      </MultistepFormProvider>
    </FormProvider>
  )
}

export default MultistepForm
