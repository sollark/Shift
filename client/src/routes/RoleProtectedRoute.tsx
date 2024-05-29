import { Role } from '@/models/Account'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { log } from '@/service/console.service'
import useAccountStore from '@/stores/accountStore'
import { FC, ReactNode } from 'react'

type RoleProtectedRouteProps = {
  children: ReactNode
  allowed: Role[]
}

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({
  children,
  allowed,
}: RoleProtectedRouteProps) => {
  log('RoleProtectedRoute is checking if access is allowed')

  const userRole = useAccountStore((state) => state.role)
  const isAccessAllowed = allowed.some(
    (allowedRole) => allowedRole === userRole
  )

  log('RoleProtectedRoute, isAccessAllowed: ', isAccessAllowed)

  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default RoleProtectedRoute
