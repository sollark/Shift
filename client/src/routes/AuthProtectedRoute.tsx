import UnauthenticatedPage from '@/pages/UnauthenticatedPage'
import { log } from '@/service/console.service'
import useTokenStore, { tokenSelectors } from '@/stores/tokenStore'
import { FC, ReactNode } from 'react'

type AuthProtectedRouteProps = {
  children: ReactNode
}

const AuthProtectedRoute: FC<AuthProtectedRouteProps> = ({
  children,
}: AuthProtectedRouteProps) => {
  log('AuthProtectedRoute is checking if access is allowed')

  const token = useTokenStore(tokenSelectors.getToken)

  const isAccessAllowed = !!token
  log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)

  return <>{isAccessAllowed ? children : <UnauthenticatedPage />}</>
}

export default AuthProtectedRoute
