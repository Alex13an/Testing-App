import React, { FC, useEffect, useRef, useState } from 'react'
import './home.scss'
import TestCard from './../../components/testCard/TestCard'
import { testsApi } from '../../store/services/TestsApi'
import { categoryApi } from '../../store/services/CategoryApi'
import { ISort, ISortType } from '../../models/fetchModels'
import CategorySelector from './../../components/categorySelector/CategorySelector'
import Loader from '../../components/loader/Loader'
import { useAppSelector } from '../../hooks/storeHooks'
import { passedTestsApi } from '../../store/services/PassedTestsApi'
import SortSelector from '../../components/sortSelector/SortSelector'
import { ITest } from '../../models/appModels'

const Home: FC = () => {
  const { userId } = useAppSelector(state => state.RootReducer.authSlice)
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<{ name: ISort; type: ISortType }>({ name: 'id', type: 'DESC' })
  const [getTests, { isLoading, isSuccess, data: tests }] = testsApi.useLazyFetchAllTestsQuery()
  const [currentTests, setCurrentTests] = useState<ITest[]>([])
  const { isLoading: catLoading, data: categories } = categoryApi.useFetchAllCategoriesQuery(null)
  const { data: passedTests, isLoading: passedLoading } = passedTestsApi.useFetchPassedTestQuery({
    userId,
  })
  const page = useRef<number>(1)
  const limit = useRef<number>(5)
  const lastElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    getTests({
      sort: sort.name,
      categoryId,
      sortType: sort.type,
      limit: limit.current,
      page: page.current,
    })
  }, [])

  useEffect(() => {
    if (!isSuccess || !tests || isLoading) return
    setCurrentTests(prev => [...prev, ...tests.rows])

    if (observer.current) observer.current.disconnect()
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && page.current < (tests.total || 1)) {
        page.current += 1
        getTests({
          sort: sort.name,
          categoryId,
          sortType: sort.type,
          limit: limit.current,
          page: page.current,
        })
      }
    }
    observer.current = new IntersectionObserver(callback)
    if (lastElement.current) observer.current.observe(lastElement.current)
  }, [tests])

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
        {/* <div className="tests__view-switchers"> */}
        {/*   <a className="tests__view test__view_list"> */}
        {/*     <UnorderedListOutlined /> */}
        {/*   </a> */}
        {/*   <a className="tests__view test__view_tiles"> */}
        {/*     <AppstoreOutlined /> */}
        {/*   </a> */}
        {/* </div> */}
      </div>
      <div className="tests__list">
        {currentTests &&
          currentTests.map(test => (
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
        <div ref={lastElement} style={{ height: '5px' }}></div>
        {(isLoading || catLoading || passedLoading) && <Loader />}
      </div>
    </div>
  )
}

export default Home
