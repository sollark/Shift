import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAuthStore, { tokenSelectors } from '@/stores/tokenStore'
import { ReactNode } from 'react'

type AuthProtectedRouteProps = {
  children: ReactNode
}

const AuthProtectedRoute = ({
  children,
}: AuthProtectedRouteProps): JSX.Element => {
  const isAuthenticated = tokenSelectors.isAuthenticated(
    useAuthStore.getState()
  )
  const isAccessAllowed = isAuthenticated
  log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default AuthProtectedRoute
