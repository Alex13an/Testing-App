import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BigButton from '../../components/bigButton/BigButton'
import Loader from '../../components/loader/Loader'
import TestQuestion from '../../components/testQuestion/TestQuestion'
import { useAppSelector } from '../../hooks/storeHooks'
import { passedTestsApi } from '../../store/services/PassedTestsApi'
import { testsApi } from '../../store/services/TestsApi'
import { CheckCircleOutlined, LeftOutlined } from '@ant-design/icons'
import './test.scss'
import { Typography, List, Avatar } from 'antd'
import getCategoryImage from '../../utils/getCategoryImage'
import GoLogin from '../../components/goLogin/GoLogin'
const { Title, Paragraph } = Typography

const Test: FC = () => {
  const params = useParams()
  const { isLoading, data } = testsApi.useFetchTestQuery({ id: Number(params.testId) })
  const { userId, isAuth } = useAppSelector(state => state.RootReducer.authSlice)
  const [passTest, {}] = passedTestsApi.useAddPassedTestsMutation()
  const { isLoading: passedLoading, data: passedResult } = passedTestsApi.useCheckPassedTestQuery({
    testId: Number(params.testId),
    userId,
  })
  const [score, setScore] = useState(0)
  const [scrollPos, setScrollPos] = useState(1)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const allPassed = useRef<number[]>([])
  const pass = useRef<boolean>(false)

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 })
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [scrollPos, started])

  const updateScore = (prevScore: number, curScore: number, currentPos: number) => {
    if (!data) return
    setScore(prev => prev - prevScore + curScore)

    if (prevScore) return
    if (!allPassed.current.some(pass => pass === currentPos)) allPassed.current.push(currentPos)
    if (allPassed.current.length >= data.questions.length) pass.current = true
    if (currentPos + 1 < data?.questions?.length && !prevScore) {
      const nextPos = currentPos + 1
      if (allPassed.current.some(pos => pos === nextPos)) return
      setScrollPos(currentPos + 1)
    } else {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  const endTest = async () => {
    if (!pass.current) return
    const success = await passTest({
      user: userId,
      test: { testId: Number(params.testId), result: score },
    })
    console.log(getResult, success)
    window.scrollTo({ left: 0, top: 0 })
  }

  const getResult = (currentScore: number) => {
    let breachResult = ''
    data?.results.forEach(result => {
      if (currentScore >= result.breach) {
        breachResult = result.body
      }
    })
    if (!breachResult && data) breachResult = data?.results[0].body

    return breachResult
  }

  if (isLoading || passedLoading) return <Loader />

  return (
    <div className="test">
      <Link to="/">
        <div className="test__back">
          <LeftOutlined />
          Назад
        </div>
      </Link>
      <h2 className="test__title">
        {data?.title}{' '}
        {passedResult?.check && (
          <span className="test__check">
            <CheckCircleOutlined />
          </span>
        )}
      </h2>
      <Avatar
        style={{ marginBottom: '50px' }}
        size={200}
        icon={<img src={getCategoryImage(data?.categoryId || 1)} alt={'test-category'} />}
      />

      {passedResult?.check ? (
        <>
          <div className="test-result">
            <h3 className="test-result__header">Ваш результат:</h3>
            <div className="test-result__body">{getResult(passedResult.result)}</div>
            <Title level={4}>Информация о тесте</Title>
            <Paragraph>{data?.description}</Paragraph>
            <List
              header={<div>Вопросы</div>}
              bordered
              dataSource={data?.questions}
              renderItem={item => <List.Item>{item.body}</List.Item>}
            />
          </div>
        </>
      ) : !started ? (
        <>
          {isAuth && <BigButton click={() => setStarted(true)}>Начать тест</BigButton>}
          <div className="test__body">{data?.description}</div>
          {!isAuth && <GoLogin />}
        </>
      ) : (
        <div className="test__content">
          <div className="test__questions-list">
            {data?.questions.map((q, index) => (
              <TestQuestion
                key={q.id}
                body={q.body}
                updateScore={updateScore}
                scrollRef={index === scrollPos ? scrollRef : undefined}
                questionId={index + 1 || 0}
              />
            ))}
          </div>
          <BigButton disabled={!pass.current} click={endTest}>
            Закончить тест
          </BigButton>
        </div>
      )}
    </div>
  )
}

export default Test
