import React, { FC } from 'react'
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
  const [query] = useSearchParams()
  const mode = query.get('auth')
  const [userReg, {}] = authApi.useUserRegisterMutation()
  const [userLogin, {}] = authApi.useUserLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: authData) => {
    if (!values.password || !values.email) return
    try {
      let response: { token: string }
      if (mode === 'login') {
        response = await userLogin({ email: values.email, password: values.password }).unwrap()
      } else {
        response = await userReg({ email: values.email, password: values.password }).unwrap()
      }
      if (response.token) {
        const decodedUser: { role: 'USER' | 'ADMIN' } = decode(response.token) || { role: 'USER' }
        dispatch(
          setUser({
            email: values.email,
            isAuth: true,
            role: decodedUser.role,
            token: response.token,
          }),
        )
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: values.email,
            isAuth: true,
            role: decodedUser.role,
            token: response.token,
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
        <h2 className="login-header">{mode === 'login' ? 'Sign in' : 'Sign Up'}</h2>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {mode === 'login' ? 'Sign in' : 'Sign Up'}
          </Button>
          Or{' '}
          <Link to={mode === 'login' ? '/auth?auth=register' : '/auth?auth=login'}>
            {mode === 'login' ? 'sign up now!' : 'sign in now!'}
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default Auth
