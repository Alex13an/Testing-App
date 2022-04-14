import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import BigButton from '../../components/bigButton/BigButton'
import Loader from '../../components/loader/Loader'
import TestQuestion from '../../components/testQuestion/TestQuestion'
import { useAppSelector } from '../../hooks/storeHooks'
import { passedTestsApi } from '../../store/services/PassedTestsApi'
import { testsApi } from '../../store/services/TestsApi'
import './test.scss'

const Test: FC = () => {
  const params = useParams()
  const { isLoading, data } = testsApi.useFetchTestQuery({ id: Number(params.testId) })
  const { userId } = useAppSelector(state => state.RootReducer.authSlice)
  const [passTest, {}] = passedTestsApi.useAddPassedTestsMutation()
  const [score, setScore] = useState(0)
  const [scrollPos, setScrollPos] = useState(1)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const allPassed = useRef<number[]>([])
  const pass = useRef<boolean>(false)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [scrollPos])

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
      tests: [{ testId: Number(params.testId), result: 3 }],
    })
    console.log(success, score)
  }

  if (isLoading) return <Loader />

  return (
    <div className="test">
      <h2 className="test__title">{data?.title}</h2>
      {!started ? (
        <>
          <BigButton click={() => setStarted(true)}>Начать тест</BigButton>
          <div className="test__body">{data?.description}</div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Test
