import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Alert } from '@material-ui/lab'

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

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [fieldsAreValid, setFieldsAreValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const email = useInputValue('')
  const name = useInputValue('')
  const userName = useInputValue('')
  const password = useInputValue('')

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  useEffect(() => {
    if (
      !email.value ||
      !re.test(email.value) ||
      !name.value ||
      !userName.value ||
      !password.value ||
      loading
    ) {
      setFieldsAreValid(false)
    } else {
      setFieldsAreValid(true)
    }
  }, [email, name, userName, password, loading])

  const handleSubmit = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        username: userName.value,
        password: password.value,
      }),
    }).then((res) => res.json())
    if (response.status === 'success') {
      window.location.assign('/login')
    } else {
      if (response.message === 'user already exists') {
        setErrorMessage('Email or Username is already in use')
      }
      setLoading(false)
    }
  }

  return (
    <Layout title="Sign up">
      <Title>Sign up</Title>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          {...email}
          disabled={loading}
          onBlur={() => {
            if (email.value) {
              if (!re.test(email.value)) {
                setErrorMessage('Email is not valid')
              } else {
                setErrorMessage('')
              }
            }
          }}
          onKeyDown={(ev) =>
            ev.key === 'Enter' && fieldsAreValid && handleSubmit()
          }
        />
        <Input
          type="text"
          placeholder="Full Name"
          {...name}
          disabled={loading}
          onKeyDown={(ev) =>
            ev.key === 'Enter' && fieldsAreValid && handleSubmit()
          }
        />
        <Input
          type="text"
          placeholder="Username"
          {...userName}
          disabled={loading}
          onKeyDown={(ev) =>
            ev.key === 'Enter' && fieldsAreValid && handleSubmit()
          }
        />
        <Input
          type="password"
          placeholder="Password"
          {...password}
          disabled={loading}
          onKeyDown={(ev) =>
            ev.key === 'Enter' && fieldsAreValid && handleSubmit()
          }
        />
        <Button onClick={handleSubmit} disabled={!fieldsAreValid}>
          Sign up
        </Button>
      </FormContainer>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Layout>
  )
}

export default Signup
