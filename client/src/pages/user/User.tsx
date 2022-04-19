import React, { FC } from 'react'
import Loader from '../../components/loader/Loader'
import { useAppSelector } from '../../hooks/storeHooks'
import { passedTestsApi } from '../../store/services/PassedTestsApi'
import './user.scss'
import { Collapse, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import TestCard from '../../components/testCard/TestCard'
import { categoryApi } from '../../store/services/CategoryApi'
const { Panel } = Collapse
const { Title, Paragraph } = Typography

const User: FC = () => {
  const { userId } = useAppSelector(state => state.RootReducer.authSlice)
  const { data, isLoading } = passedTestsApi.useGetAllPassedTestsQuery(
    { userId },
    {
      refetchOnFocus: true,
    },
  )
  const { isLoading: catLoading, data: categories } = categoryApi.useFetchAllCategoriesQuery(null)

  if (isLoading || catLoading) return <Loader />

  return (
    <div className="passed-test">
      <Title level={2}>Пройденные тесты</Title>
      <Paragraph>
        <Collapse bordered={false}
          expandIconPosition="right"
          expandIcon={({ isActive }) => <LeftOutlined rotate={isActive ? -90 : 0} />}
        >
          {data?.map(test => (
            <Panel
              key={test.testId}
              header={
                <TestCard
                  categoryId={test.categoryId}
                  title={test.title}
                  id={test.testId}
                  passed={true}
                  category={categories?.find(cat => cat.id === test.categoryId)?.name || 'Другое'}
                />
              }
            >
              <span className="passed-test__result">Результат: </span>
              {test.result}
            </Panel>
          ))}
        </Collapse>
      </Paragraph>
    </div>
  )
}

export default User
