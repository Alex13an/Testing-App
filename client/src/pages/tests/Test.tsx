import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { testsApi } from '../../store/services/TestsApi'

const Test: FC = () => {
  const params = useParams()
  const { isLoading, data } = testsApi.useFetchTestQuery({ id: Number(params.testId) })

  if (isLoading) return <div>Loading...</div>
  console.log(data)

  return (
    <div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
      <div>
        {data?.questions.map(q => (
          <div key={q.id}>{q.body}</div>
        ))}
      </div>
    </div>
  )
}

export default Test
