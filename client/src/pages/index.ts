import React from 'react'

const Home = React.lazy(() => import('./home/Home'))
const Auth = React.lazy(() => import('./auth/Auth'))
const User = React.lazy(() => import('./user/User'))
const Test = React.lazy(() => import('./tests/Test'))
const Admin = React.lazy(() => import('./admin/AdminPanel'))

export interface IRoute {
  path: string
  element: React.ComponentType
}

export enum RouteNames {
  HOME = '/',
  AUTH = '/auth',
  USER = '/user',
  TEST = '/:testId',
  ADMIN = '/admin',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    element: Home,
  },
  {
    path: RouteNames.AUTH,
    element: Auth,
  },
  {
    path: RouteNames.TEST,
    element: Test,
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    element: Home,
  },
  {
    path: RouteNames.USER,
    element: User,
  },
  {
    path: RouteNames.TEST,
    element: Test,
  },
  {
    path: RouteNames.ADMIN,
    element: Admin,
  },
]
