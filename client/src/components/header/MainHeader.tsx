import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import './mainHeader.scss'
import { useAppSelector } from '../../hooks/storeHooks'
import { Menu, Dropdown } from 'antd'

const MainHeader: FC = () => {
  const { isAuth, role } = useAppSelector(state => state.RootReducer.authSlice)
  const removeToken = () => {
    localStorage.removeItem('user')
  }
  const menu = (
    <Menu>
      <Menu.Item key={1}>Профиль</Menu.Item>
      <Menu.Item key={2} onClick={removeToken}>
        <a href="/">Выход</a>
      </Menu.Item>
      {role === 'ADMIN' && (
        <Menu.Item key={3}>
          <Link to={'/admin'}>Admin panel</Link>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <div className="main-header">
      <Link to={'/'} className="main-header__logo">
        Testicon
      </Link>
      <div className="main-header__menu">
        <div className="main-header__search">
          <input className="main-header__input" type="text" placeholder="Найти тест..." />
          <button className="main-header__input-submit">
            <SearchOutlined />
          </button>
        </div>
        {isAuth ? (
          <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <div
              className={
                isAuth ? 'main-header__login main-header__login_active' : 'main-header__login'
              }
            >
              <UserOutlined />
            </div>
          </Dropdown>
        ) : (
          <Link to={isAuth ? '/user' : '/auth?auth=login'}>
            <div
              className={
                isAuth ? 'main-header__login main-header__login_active' : 'main-header__login'
              }
            >
              <UserOutlined />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default MainHeader
