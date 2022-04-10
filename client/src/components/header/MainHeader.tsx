import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import './mainHeader.scss'
import { useAppSelector } from '../../hooks/storeHooks'
import { Tooltip } from 'antd'

const MainHeader: FC = () => {
  const { isAuth, email } = useAppSelector(state => state.RootReducer.authSlice)

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
        <Link to={isAuth ? '/user' : '/auth?auth=login'}>
          {isAuth ? (
            <Tooltip placement="bottom" title={email}>
              <div
                className={
                  isAuth ? 'main-header__login main-header__login_active' : 'main-header__login'
                }
              >
                <UserOutlined />
              </div>
            </Tooltip>
          ) : (
            <div
              className={
                isAuth ? 'main-header__login main-header__login_active' : 'main-header__login'
              }
            >
              <UserOutlined />
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}

export default MainHeader
