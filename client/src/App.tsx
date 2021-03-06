import React, { FC, Suspense, useEffect } from 'react'
import './styles/main.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './pages'
import { Layout } from 'antd'
const { Content, Footer } = Layout
import 'antd/dist/antd.css'
import MainHeader from './components/header/MainHeader'
import { useAppSelector, useAppDispatch } from './hooks/storeHooks'
import { setUser } from './store/reducers/authSlice'
import Loader from './components/loader/Loader'

const App: FC = () => {
  const { isAuth } = useAppSelector(state => state.RootReducer.authSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  })

  return (
    <>
      <Layout>
        <MainHeader />
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 100 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            {isAuth ? (
              <Suspense fallback={<Loader />}>
                <Routes>
                  {privateRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={<route.element />} />
                  ))}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            ) : (
              <Suspense fallback={<Loader />}>
                <Routes>
                  {publicRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={<route.element />} />
                  ))}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Testicon testing app ©2022</Footer>
      </Layout>
    </>
  )
}

export default App
