import React, { FC, useState } from 'react'
import './home.scss'
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import TestCard from './../../components/testCard/TestCard'
import { testsApi } from '../../store/services/TestsApi'
import { categoryApi } from '../../store/services/CategoryApi'
import { ISort, ISortType, TestParams } from '../../models/fetchModels'
import CategorySelector from './../../components/categorySelector/CategorySelector'
import Loader from '../../components/loader/Loader'
import { useAppSelector } from '../../hooks/storeHooks'
import { passedTestsApi } from '../../store/services/PassedTestsApi'
import SortSelector from '../../components/sortSelector/SortSelector'

const Home: FC = () => {
  const { userId } = useAppSelector(state => state.RootReducer.authSlice)
  const [testParams /*, setTestParams*/] = useState<TestParams>({
    limit: undefined,
    page: undefined,
  })
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<{ name: ISort; type: ISortType }>({ name: 'id', type: 'DESC' })
  const { isLoading, data: tests } = testsApi.useFetchAllTestsQuery({
    categoryId,
    sort: sort.name,
    sortType: sort.type,
    limit: testParams.limit,
    page: testParams.page,
  })
  const { isLoading: catLoading, data: categories } = categoryApi.useFetchAllCategoriesQuery(null)
  const { data: passedTests, isLoading: passedLoading } = passedTestsApi.useFetchPassedTestQuery({
    userId,
  })

  if (isLoading || catLoading || passedLoading) return <Loader />

  return (
    <div className="tests">
      <h1 className="tests__header">Тесты онлайн</h1>
      <span className="tests__subheader">психологические, образовательные, smart, IQ</span>
      <div className="tests__settings">
        <div className="tests__filters">
          <CategorySelector
            first
            categories={categories || []}
            setCatId={setCategoryId}
            catId={categoryId}
            catName={true}
          />
          <SortSelector sort={sort} setSort={setSort} />
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
            categoryId={test.categoryId}
            description={test.description}
            id={test.id}
            rating={test.rating}
            title={test.title}
            passed={passedTests?.userTests.some(t => t.testId === test.id) || false}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
