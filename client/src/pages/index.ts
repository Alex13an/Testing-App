import React from 'react'

const Home = React.lazy(() => import('./home/Home'))
const PageOne = React.lazy(() => import('./pageOne/PageOne'))
const PageTwo = React.lazy(() => import('./pageTwo/PageTwo'))

export interface IRoute {
  path: string
  element: React.ComponentType
}

export enum RouteNames {
  HOME = '/',
  PAGEONE = '/pageOne',
  PAGETWO = '/pageTwo',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    element: Home,
  },
  {
    path: RouteNames.PAGEONE,
    element: PageOne,
  },
  {
    path: RouteNames.PAGETWO,
    element: PageTwo,
  },
]
