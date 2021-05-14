import { useState } from 'react'

export const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem('tkn')
    return token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: string) => {
    localStorage.setItem('tkn', userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token,
  }
}
