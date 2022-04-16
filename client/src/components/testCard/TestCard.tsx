import React, { FC } from 'react'
import './testCard.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import getCategoryImage from '../../utils/getCategoryImage'

interface TestCardProps {
  id: number
  title: string
  category: string
  categoryId: number
  description?: string
  rating?: number
  passed?: boolean
}

const TestCard: FC<TestCardProps> = ({ id, category, categoryId, title, passed }) => {
  return (
    <Link to={`/${id}`}>
      <div className="test-card">
        <div className="test-card__image">
          <Avatar
            size="large"
            icon={<img src={getCategoryImage(categoryId)} alt={'test-category'} />}
          />
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
