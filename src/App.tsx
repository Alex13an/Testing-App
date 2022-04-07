import React, { FC, Suspense } from 'react'
import './styles/main.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './pages'
import { Layout } from 'antd'
const { Content, Footer } = Layout
import 'antd/dist/antd.css'
import MainHeader from './components/header/MainHeader'

const App: FC = () => {
  return (
    <>
      <Layout>
        <MainHeader />
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 100 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {publicRoutes.map(route => (
                  <Route key={route.path} path={route.path} element={<route.element />} />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  )
}

export default App
