import React, { FC, useState } from 'react'
import './home.scss'
import { Menu, Dropdown, message } from 'antd'
import { DownOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import TestCard from './../../components/testCard/TestCard'
import { testsApi } from '../../store/services/TestsApi'
import { categoryApi } from '../../store/services/CategoryApi'
import { TestParams } from '../../models/fetchModels'
import CategorySelector from './../../components/categorySelector/CategorySelector'

const Home: FC = () => {
  const [testParams /*, setTestParams*/] = useState<TestParams>({
    limit: undefined,
    page: undefined,
  })
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const { isLoading, data: tests } = testsApi.useFetchAllTestsQuery({
    categoryId,
    limit: testParams.limit,
    page: testParams.page,
  })
  const { isLoading: catLoading, data: categories } = categoryApi.useFetchAllCategoriesQuery(null)

  const onClick = () => {
    message.info(`Click on item key`)
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )

  if (isLoading || catLoading) return <div>Loading...</div>

  return (
    <div className="tests">
      <h1 className="tests__header">Тесты онлайн</h1>
      <span className="tests__subheader">психологические, образовательные, smart, IQ</span>
      <div className="tests__settings">
        <div className="tests__filters">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Фильтр <DownOutlined />
            </a>
          </Dropdown>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Сортировка <DownOutlined />
            </a>
          </Dropdown>
          <CategorySelector
            first
            categories={categories || []}
            setCatId={setCategoryId}
            catId={categoryId}
            catName={false}
          />
        </div>
        <div className="tests__view-switchers">
          <a className="tests__view test__view_list">
            <UnorderedListOutlined />
          </a>
          <a className="tests__view test__view_tiles">
            <AppstoreOutlined />
          </a>
        </div>
      </div>
      <div className="tests__list">
        {tests?.rows.map(test => (
          <TestCard
            key={test.id}
            category={categories?.find(cat => cat.id === test.categoryId)?.name || 'Другое'}
            description={test.description}
            id={test.id}
            rating={test.rating}
            title={test.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
