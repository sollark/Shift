import { log } from '@/service/console.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactElement, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
  children: ReactNode
  submit: (data: any) => void
  schema: any
  defaultValues?: any
  submitButton?: ReactElement
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Form: FC<Props> = (props: Props) => {
  log('Form connected')

  const { children, schema, defaultValues, submit, submitButton, ...rest } =
    props

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const { handleSubmit } = methods

  const onSubmit = (data: any) => {
    submit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
        <div>{submitButton ? submitButton : null}</div>
      </form>
    </FormProvider>
  )
}

export default Form
