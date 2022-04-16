import React, { FC } from 'react'
import './goLogin.scss'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
const { Paragraph, Text } = Typography

const GoLogin: FC = () => {
  return (
    <div className="go-login">
      <Paragraph>
        <Link to="/auth?auth=login">
          <Text code>Войдите</Text>{' '}
        </Link>{' '}
        или{' '}
        <Link to="/auth?auth=register">
          <Text code>зарегестрируйтесь</Text>
        </Link>
        , чтобы пройти тест
      </Paragraph>
    </div>
  )
}

export default GoLogin
