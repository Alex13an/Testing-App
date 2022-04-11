import React, { FC } from 'react'
import './testCard.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

interface TestCardProps {
  id: number
  title: string
  category: string
  description?: string
  rating?: number
  passed?: boolean
}

const TestCard: FC<TestCardProps> = ({ id, category, title, passed }) => {
  return (
    <Link to={`/${id}`}>
      <div className="test-card">
        {' '}
        <div className="test-card__image">
          <img src="" alt="test-card" />
        </div>
        <div className="test-card__content">
          <div className="test-card__title">{title}</div>
          <div className="test-card__category">{category}</div>
        </div>
        {passed && (
          <div className="test-card__passed">
            <CheckCircleOutlined />
          </div>
        )}
      </div>
    </Link>
  )
}

export default TestCard
