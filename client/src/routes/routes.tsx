import RootPage from '@/layouts/RootPage'
import HomePage from '@/pages/HomePage'
import { authService } from '@/service/auth.service'
import { RootRoute, Route, lazyRouteComponent } from '@tanstack/react-router'
import { Suspense } from 'react'
import AuthProtectedRoute from './AuthProtectedRoute'
const AboutPage = lazyRouteComponent(() => import('@/pages/AboutPage'))
const SettingsPage = lazyRouteComponent(() => import('@/pages/SettingsPage'))
const AccountPage = lazyRouteComponent(() => import('@/pages/AccountPage'))
const AccountEditPage = lazyRouteComponent(
  () => import('@/pages/AccountEditPage')
)
const ProfilePage = lazyRouteComponent(() => import('@/pages/ProfilePage'))
const SigninPage = lazyRouteComponent(() => import('@/pages/SigninPage'))
const RegistrationPage = lazyRouteComponent(
  () => import('@/pages/RegistrationPage')
)
const MissingPage = lazyRouteComponent(() => import('@/pages/MissingPage'))
const UnauthorizedPage = lazyRouteComponent(
  () => import('@/pages/UnauthorizedPage')
)
const UnauthenticatedPage = lazyRouteComponent(
  () => import('@/pages/UnauthenticatedPage')
)

export const rootRoute = new RootRoute({
  component: RootPage,
  beforeLoad: () => {
    // TODO server api
    authService.authCheck()
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
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationPage />
    </Suspense>
  ),
})

export const unauthorizedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: UnauthorizedPage,
})

export const unauthenticatedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/unauthenticated',
  component: UnauthenticatedPage,
})

export const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <AuthProtectedRoute>
      <ProfilePage />
    </AuthProtectedRoute>
  ),
})

export const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: () => (
    <AuthProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountPage />
      </Suspense>
    </AuthProtectedRoute>
  ),
})

export const accountEditRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account/edit',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountEditPage />
    </Suspense>
  ),
})

export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

export const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
