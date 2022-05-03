import React, { FC } from 'react'
import './testCard.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Avatar, Card } from 'antd'
const { Meta } = Card
import getCategoryImage from '../../utils/getCategoryImage'

interface TestCardProps {
  id: number
  title: string
  category: string
  categoryId: number
  type: number
  description?: string
  rating?: number
  passed?: boolean
}

const TestCard: FC<TestCardProps> = ({
  id,
  category,
  categoryId,
  title,
  description,
  passed,
  type,
}) => {
  const getDesc = () => {
    return description?.substring(0, 110) + '...'
  }

  return (
    <Link to={`/${id}`}>
      {type ? (
        <Card
          hoverable
          style={{ width: 240, minHeight: 400 }}
          cover={
            <img
              src={getCategoryImage(categoryId)}
              alt={'test-category'}
              height={180}
              style={{ marginTop: '20px' }}
            />
          }
        >
          <Meta
            title={
              <span>
                {title}
                {passed && (
                  <div className="test-card__passed">
                    <CheckCircleOutlined />
                  </div>
                )}
              </span>
            }
            description={getDesc()}
          />
        </Card>
      ) : (
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
      )}
    </Link>
  )
}

export default TestCard
