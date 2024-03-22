import { FC } from 'react'
import { Person } from '../models/Person'

type PersonNameProps = {
  person: Person
}

const PersonName: FC<PersonNameProps> = ({ person }) => {
  return (
    <span>
      {person.firstName} {person.lastName}
    </span>
  )
}

export default PersonName
