import { CompanyNumberSchema } from '@/models/Company'
import { EmployeeNumberSchema } from '@/models/Employee'
import { accountService } from '@/service/account.service'
import { log } from '@/service/console.service'
import { useNavigate } from '@tanstack/react-router'
import { FC, useState } from 'react'
import { z } from 'zod'
import ErrorMessage from './ErrorMessage'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput/TextInput'

type JoinCompanyForm = {
  companyNumber: string
  employeeNumber: string
}

const JoinCompanySchema = z
  .object({})
  .merge(CompanyNumberSchema)
  .merge(EmployeeNumberSchema)

const defaultValues = {
  companyNumber: '',
  employeeNumber: '',
}

const JoinCompanyForm: FC = () => {
  log('JoinCompanyForm connected')

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function submit(form: any) {
    log('JoinCompanyForm form submitted: ', form)

    const { companyNumber, employeeNumber } = form
    setErrorMessage('')

    const response = await accountService.joinCompany(
      companyNumber,
      employeeNumber
    )
    const { success, message } = response

    log('JoinCompanyForm response: ', response)
    if (!success) {
      setErrorMessage(message)
      return
    }

    navigate({ to: '/' })
  }

  return (
    <Form
      schema={JoinCompanySchema}
      defaultValue={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='companyNumber' label='Company number' type='text' />
      <Input name='employeeNumber' label='Employee number' type='text' />
      <ErrorMessage message={errorMessage} />
    </Form>
  )
}

export default JoinCompanyForm
