import React, { FC } from 'react'
import './home.scss'
import { Menu, Dropdown, message } from 'antd'
import { DownOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import TestCard from './../../components/testCard/TestCard'

const Home: FC = () => {
  const onClick = ({ key }: { key: any }) => {
    message.info(`Click on item ${key}`)
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )
  return (
    <div className="tests">
      <h1 className="tests__header">Тесты онлайн</h1>
      <span className="tests__subheader">психологические, образовательные, smart, IQ</span>
      <div className="tests__settings">
        <div className="tests__filters">
          <Dropdown overlay={menu}>
            <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Фильтр <DownOutlined />
            </button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Сортировка <DownOutlined />
            </button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Категория <DownOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="tests__view-switchers">
          <button className="tests__view test__view_list">
            <UnorderedListOutlined />
          </button>
          <button className="tests__view test__view_tiles">
            <AppstoreOutlined />
          </button>
        </div>
      </div>
      <div className="tests__list">
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
      </div>
    </div>
  )
}

export default Home
