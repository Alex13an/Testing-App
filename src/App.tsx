import React, { FC, Suspense } from 'react'
import './styles/main.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './pages'

const App: FC = () => {
  return (
    <>
      123
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
