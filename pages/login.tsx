import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { Alert } from '@material-ui/lab'
import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'

import Layout from '../components/Layout'
import { useInputValue } from '../hooks/userInputValue'

const FormContainer = styled.div`
  padding: 14px 15px;
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 8px 4px;
  display: block;
  width: 100%;

  &[disabled] {
    opacity: 0.3;
  }
`

const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  padding: 6px 15px;
`

const Button = styled.button`
  background: #8d00ff;
  border-radius: 3px;
  color: #fff;
  height: 32px;
  display: block;
  width: 100%;
  text-align: center;

  &[disabled] {
    opacity: 0.3;
  }

  &:hover {
    background: #7502d1;
    cursor: pointer;
  }
`

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}) => {
  const cookies = new Cookies(req, res)
  const token = cookies.get('t')

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return { props: {} }
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [, setCookie] = useCookies(['t'])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    window.localStorage.removeItem('userInfo-id')
    window.localStorage.removeItem('userInfo-name')
    window.localStorage.removeItem('userInfo-username')
  }, [])

  const identity = useInputValue('')
  const password = useInputValue('')

  const handleSubmit = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: identity.value,
        password: password.value,
      }),
    }).then((res) => res.json())
    if (response.status === 'success') {
      setCookie('t', response.data.token, {
        sameSite: true,
      })
      window.localStorage.setItem('userInfo-id', response.data.id)
      window.localStorage.setItem('userInfo-name', response.data.name)
      window.localStorage.setItem('userInfo-username', response.data.username)
      window.location.reload()
    } else {
      setErrorMessage('Incorrect username or password')
      setLoading(false)
    }
  }

  return (
    <Layout title="Login">
      <Title>Log in</Title>
      <FormContainer>
        <Input
          type="text"
          placeholder="Type email or username"
          {...identity}
          disabled={loading}
          onKeyDown={(ev) => ev.key === 'Enter' && handleSubmit()}
        />
        <Input
          type="password"
          placeholder="Password"
          {...password}
          disabled={loading}
          onKeyDown={(ev) => ev.key === 'Enter' && handleSubmit()}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          Log In
        </Button>
        {/* <StyledLink to="/signup">Sign up</StyledLink> */}
      </FormContainer>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Layout>
  )
}

export default Login
