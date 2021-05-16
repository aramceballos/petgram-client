import React from 'react'
import { AppProps } from 'next/app'
import { useCookies } from 'react-cookie'

import Login from './login'
import GlobalStyles from '../styles/GlobalStyles'
import Logo from '../components/Logo'
import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cookie] = useCookies(['t'])
  const token = cookie['t']

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
        <Login />
      )}
    </>
  )
}

export default MyApp
