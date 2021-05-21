import React from 'react'
import { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'

import GlobalStyles from '../styles/GlobalStyles'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
      <NavBar />
    </CookiesProvider>
  )
}

export default MyApp
