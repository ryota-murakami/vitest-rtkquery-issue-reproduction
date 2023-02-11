import { superstructResolver } from '@hookform/resolvers/superstruct'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { assertCast } from '../../../lib/assertCast'
import { userAccountValidator } from '../../../validator'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Layout from '../../components/Layout'
import { login } from '../../redux/adminSlice'
import { API } from '../../redux/API'
import isSuccess from '../../redux/helper/isSuccess'
import { enqueSnackbar } from '../../redux/snackbarSlice'
import { dispatch } from '../../redux/store'

interface FormInput extends FieldValues {
  name: Author['name']
  password: Author['password']
}

const Login: React.FC = memo(() => {
  const navigate = useNavigate()
  const [loginReqest] = API.endpoints.loginReqest.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: superstructResolver(userAccountValidator),
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await loginReqest({
      name: data.name,
      password: data.password,
    })
    if (isSuccess(res) && 'data' in res) {
      const data = res.data
      if ('failed' in data) {
        assertCast<Res.failedMessage>(data)
        dispatch(enqueSnackbar({ color: 'red', message: data.failed }))
        return // missing username or pass, onemore time!
      }

      // Login SuccessFul!
      dispatch(login(data))
      dispatch(enqueSnackbar({ color: 'green', message: 'Login SuccessFul!' }))

      navigate('/dashboard')
    }
  }

  return (
    <>
      <h1 className="text-color-primary mb-3 text-3xl">Login</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="name"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <Input
              type="text"
              reactHookFormPrams={{
                fieldError: errors['name'],
                name: 'name',
                register,
              }}
              data-cy="name-input"
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <Input
              type="password"
              reactHookFormPrams={{
                fieldError: errors['password'],
                name: 'password',
                register,
              }}
              data-cy="password-input"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <Button type="submit" variant="secondary" data-cy="submit-btn">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  )
})
Login.displayName = 'Login'

const LoginPage = memo(() => (
  <Layout>
    <Login />
  </Layout>
))

export default LoginPage
