import RootPage from '@/layouts/RootPage'
import HomePage from '@/pages/HomePage'
import { RootRoute, Route, lazyRouteComponent } from '@tanstack/react-router'
import AuthProtectedRoute from './AuthProtectedRoute'

const AccountPage = lazyRouteComponent(() => import('@/pages/AccountPage'))
const SigninPage = lazyRouteComponent(() => import('@/pages/SigninPage'))
const MissingPage = lazyRouteComponent(() => import('@/pages/MissingPage'))
const RegistrationPage = lazyRouteComponent(
  () => import('@/pages/RegistrationPage')
)
const UnauthorizedPage = lazyRouteComponent(
  () => import('@/pages/UnauthorizedPage')
)

export const rootRoute = new RootRoute({
  component: RootPage,
  beforeLoad: () => {
    // useAuthStore.getState().getAccess()
  },
})

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

export const signinRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SigninPage,
})

export const registrationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: RegistrationPage,
})

export const unauthorizedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: UnauthorizedPage,
})

export const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: () => (
    <AuthProtectedRoute>
      <AccountPage />
    </AuthProtectedRoute>
  ),
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
