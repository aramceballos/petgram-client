import React from 'react'
import { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'

import GlobalStyles from '../styles/GlobalStyles'
import Logo from '../components/Logo'
import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <GlobalStyles />
      <Logo />
      <Component {...pageProps} />
      <NavBar />
    </CookiesProvider>
  )
}

export default MyApp
