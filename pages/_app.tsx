import React, { useState } from 'react'
import { AppProps } from 'next/app'

import GlobalStyles from '../styles/GlobalStyles'
import Logo from '../components/Logo'
import NavBar from '../components/NavBar'
import Login from './login'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [token, setToken] = useState('')
  return (
    <>
      <GlobalStyles />
      <Logo />
      {token ? (
        <>
          <Component {...pageProps} />
          <NavBar />
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </>
  )
}

export default MyApp
