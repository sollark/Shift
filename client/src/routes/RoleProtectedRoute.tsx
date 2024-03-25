import { Role } from '@/models/Account'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAccountStore from '@/stores/accountStore'
import { ReactNode } from 'react'

interface RoleProtectedRouteProps {
  children: ReactNode
  allowed: Role[]
}

const RoleProtectedRoute = ({
  children,
  allowed,
}: RoleProtectedRouteProps): JSX.Element => {
  log('RoleProtectedRoute, allowed: ', allowed)

  const userRole = useAccountStore((state) => state.role)
  const isAccessAllowed = allowed.some(
    (allowedRole) => allowedRole === userRole
  )

  log('RoleProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default RoleProtectedRoute
