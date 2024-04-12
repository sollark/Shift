import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAccountStore, { accountSelector } from '@/stores/accountStore'
import { ReactNode } from 'react'

type VerifiedProtectedRouteProps = {
  children: ReactNode
}

const VerifiedProtectedRoute = ({
  children,
}: VerifiedProtectedRouteProps): JSX.Element => {
  const isAccountVerified = accountSelector.isVerified(
    useAccountStore.getState()
  )
  const isAccessAllowed = isAccountVerified
  log('VerifiedProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default VerifiedProtectedRoute
