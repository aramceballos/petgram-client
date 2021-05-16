import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
// import Link from 'next/link'
import styled from 'styled-components'
// import { Alert } from '@material-ui/lab'
import axios from 'axios'

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

// const StyledLink = styled(Link)`
//   margin-top: 10px;
//   text-decoration: none;
//   color: #5050ff;
//   font-weight: 700;
//   text-align: right;
//   float: right;
// `

type TCredentials = {
  identity: string
  password: string
}

const Login = () => {
  const [loading] = useState(false)
  const [, setCookie] = useCookies(['t'])
  // const [errorMessage] = useState(null)

  const identity = useInputValue('')
  const password = useInputValue('')

  async function loginUser(credentials: TCredentials) {
    return axios('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(credentials),
    }).then((res) => res.data.data)
  }

  const handleSubmit = async () => {
    const token = await loginUser({
      identity: identity.value,
      password: password.value,
    })
    setCookie('t', token, {
      sameSite: true,
    })
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
      {/* {errorMessage && <Alert severity="error">{errorMessage}</Alert>} */}
    </Layout>
  )
}

export default Login
