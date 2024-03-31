import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAuthStore, { authSelectors } from '@/stores/authStore'
import { ReactNode } from 'react'

type AuthProtectedRouteProps = {
  children: ReactNode
}

const AuthProtectedRoute = ({
  children,
}: AuthProtectedRouteProps): JSX.Element => {
  const isAuthenticated = authSelectors.isAuthenticated(useAuthStore.getState())
  const isAccessAllowed = isAuthenticated
  log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default AuthProtectedRoute
