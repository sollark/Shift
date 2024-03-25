import { config } from '@/config/config'
import { Router } from '@tanstack/react-router'
import React from 'react'
import {
  accountDetailsRoute,
  accountEditRoute,
  accountListRoute,
  accountRoute,
  companyRoute,
  employeeListRoute,
  homeRoute,
  joinCompanyRoute,
  missingRoute,
  registrationRoute,
  rootRoute,
  signinRoute,
  unauthorizedRoute,
} from './routes'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// TanStack devtools
export const TanStackRouterDevtools =
  config.env === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

const routeTree = rootRoute.addChildren([
  homeRoute,
  signinRoute,
  registrationRoute,
  accountRoute.addChildren([
    accountDetailsRoute,
    accountEditRoute,
    joinCompanyRoute,
  ]),
  companyRoute,
  employeeListRoute,
  accountListRoute,
  unauthorizedRoute,
  missingRoute,
])

export const router = new Router({ routeTree })
