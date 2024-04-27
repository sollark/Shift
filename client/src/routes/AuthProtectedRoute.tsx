import UnauthenticatedPage from '@/pages/UnauthenticatedPage'
import { authService } from '@/service/auth.service'
import { log } from '@/service/console.service'
import { tokenService } from '@/service/token.service'
import useTokenStore, { tokenSelectors } from '@/stores/tokenStore'
import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

type AuthProtectedRouteProps = {
  children: ReactNode
}

// TODO refresh is good, but still got unauthorized. check if token triggers rerender
const AuthProtectedRoute: FC<AuthProtectedRouteProps> = ({
  children,
}: AuthProtectedRouteProps) => {
  const token = useTokenStore(tokenSelectors.getToken)

  const { isPending, isError } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: authService.refreshTokens,
    enabled: !!token && tokenService.isTokenExpired(token),
  })

  if (isPending) return <span>Loading...</span>
  if (isError) return <UnauthenticatedPage />

  const isAccessAllowed = !!token
  log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)

  return <>{isAccessAllowed ? children : <UnauthenticatedPage />}</>
}

export default AuthProtectedRoute
