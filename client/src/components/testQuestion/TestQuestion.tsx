import React, { FC, useState } from 'react'
import './testQuestion.scss'
import { Divider } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

interface TestQuesionProps {
  body: string
  updateScore: (prevScore: number, curScore: number, currentPos: number) => void
  scrollRef: React.RefObject<HTMLDivElement> | undefined
  questionId: number
}

const circleArr = [1, 2, 3, 4, 5, 6, 7]

const TestQuestion: FC<TestQuesionProps> = ({ body, updateScore, scrollRef, questionId }) => {
  const [activeResult, setActiveResult] = useState(0)

  const setScore = (circle: number) => {
    updateScore(activeResult, circle, questionId)
    setActiveResult(circle)
  }

  const getCircle = (index: number): string => {
    const center = circleArr[Math.floor(circleArr.length / 2)]
    if (index === center)
      return `center ${index === activeResult && 'test-question__circle_active-center'}`
    if (index < center)
      return `test-question__circle_less test-question__circle_${center - index} ${
        index === activeResult && 'test-question__circle_active-less'
      }`
    if (index > center)
      return `test-question__circle_more test-question__circle_${index - center} ${
        index === activeResult && 'test-question__circle_active-more'
      }`
    return ''
  }

  return (
    <div
      className={`test-question ${activeResult && 'test-question_passed'}`}
      ref={scrollRef ? scrollRef : undefined}
    >
      <h3>{body}</h3>
      <div className="test-question__circles">
        <span className="test-question__less">Несогласен</span>
        {circleArr.map(circle => (
          <div
            className={`test-question__circle ${getCircle(circle)}`}
            key={circle}
            onClick={() => setScore(circle)}
          >
            {circle === activeResult && <CheckOutlined />}
          </div>
        ))}
        <span className="test-question__more">Согласен</span>
      </div>
      <Divider />
    </div>
  )
}

export default TestQuestion
