import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAccountStore from '@/stores/accountStore'
import { ReactNode } from 'react'

type VerifiedProtectedRouteProps = {
  children: ReactNode
}

const VerifiedProtectedRoute = ({
  children,
}: VerifiedProtectedRouteProps): JSX.Element => {
  const isAccountVerified = useAccountStore((state) => state.isVerified)()
  const isAccessAllowed = isAccountVerified

  log('VerifiedProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default VerifiedProtectedRoute
