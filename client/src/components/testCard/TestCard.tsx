import React, { FC } from 'react'
import './testCard.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const TestCard: FC = () => {
  return (
    <Link to={'/link'}>
      <div className="test-card">
        {' '}
        <div className="test-card__image">
          <img src="" alt="test-card" />
        </div>
        <div className="test-card__content">
          <div className="test-card__title">Тест на проверку количества нейронов</div>
          <div className="test-card__category">Интеллект и бобры</div>
        </div>
        <div className="test-card__passed">
          <CheckCircleOutlined />
        </div>
      </div>
    </Link>
  )
}

export default TestCard
