import React, { FC, useState } from 'react'
import './auth.scss'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../store/services/AuthApi'
import { useAppDispatch } from './../../hooks/storeHooks'
import { setUser } from '../../store/reducers/authSlice'
import decode from 'jwt-decode'

interface authData {
  email: string
  password: string
}

const Auth: FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [query] = useSearchParams()
  const mode = query.get('auth')
  const [userReg, {}] = authApi.useUserRegisterMutation()
  const [userLogin, {}] = authApi.useUserLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: authData) => {
    if (!values.password || !values.email) return
    setButtonLoading(true)
    try {
      let response: { token: string }
      if (mode === 'login') {
        response = await userLogin({ email: values.email, password: values.password }).unwrap()
      } else {
        response = await userReg({
          email: values.email,
          password: values.password,
          role: 'USER',
        }).unwrap()
      }
      if (response.token) {
        const decodedUser: { role: 'USER' | 'ADMIN'; id: number } = decode(response.token) || {
          role: 'USER',
          id: 0,
        }
        dispatch(
          setUser({
            email: values.email,
            isAuth: true,
            role: decodedUser.role,
            token: response.token,
            userId: decodedUser.id,
          }),
        )
        localStorage.removeItem('user')
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: values.email,
            isAuth: true,
            role: decodedUser.role,
            token: response.token,
            userId: decodedUser.id,
          }),
        )
        navigate('/')
      }
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h2 className="login-header">{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Пожалуйста введите свой email' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={buttonLoading}
          >
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </Button>{' '}
          <Link to={mode === 'login' ? '/auth?auth=register' : '/auth?auth=login'}>
            {mode === 'login' ? 'Войти' : 'Зарегестрироваться'}
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default Auth
