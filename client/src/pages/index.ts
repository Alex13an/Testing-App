import React from 'react'

const Home = React.lazy(() => import('./home/Home'))
const Auth = React.lazy(() => import('./auth/Auth'))
const User = React.lazy(() => import('./user/User'))

export interface IRoute {
  path: string
  element: React.ComponentType
}

export enum RouteNames {
  HOME = '/',
  AUTH = '/auth',
  USER = '/user',
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
]
