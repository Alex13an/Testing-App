import React, { FC } from 'react'
import './testCard.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import category1 from '../../assets/images/categories/category-1.svg'
import category2 from '../../assets/images/categories/category-2.svg'
import category3 from '../../assets/images/categories/category-3.svg'
import category4 from '../../assets/images/categories/category-4.svg'
import category5 from '../../assets/images/categories/category-5.svg'

interface TestCardProps {
  id: number
  title: string
  category: string
  categoryId: number
  description?: string
  rating?: number
  passed?: boolean
}

const catImg = [category1, category2, category3, category4, category5]

const TestCard: FC<TestCardProps> = ({ id, category, categoryId, title, passed }) => {
  return (
    <Link to={`/${id}`}>
      <div className="test-card">
        <div className="test-card__image">
          <Avatar
            size="large"
            icon={
              <img
                src={categoryId > catImg.length ? catImg[0] : catImg[categoryId - 1]}
                alt={'test-category'}
              />
            }
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
