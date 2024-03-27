import { Profile } from '@/models/Profile'
import { FC } from 'react'

type FullNameProps = {
  profile: Profile
}

const FullName: FC<FullNameProps> = ({ profile }) => {
  return (
    <span>
      {profile.firstName} {profile.lastName}
    </span>
  )
}

export default FullName
