import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import './mainHeader.scss'

const MainHeader: FC = () => {
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
        <div className="main-header__login">
          <UserOutlined />
        </div>
      </div>
    </div>
  )
}

export default MainHeader
