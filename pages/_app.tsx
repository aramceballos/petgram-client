import React from 'react'
import { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import Cookies from 'cookies'
import { IncomingMessage, ServerResponse } from 'http'

import Login from './login'
import GlobalStyles from '../styles/GlobalStyles'
import Logo from '../components/Logo'
import NavBar from '../components/NavBar'

const MyApp = ({
  Component,
  pageProps,
  token,
}: AppProps & { token: string }) => {
  return (
    <CookiesProvider>
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
    </CookiesProvider>
  )
}

MyApp.getInitialProps = (appContext: {
  ctx: { req: IncomingMessage; res: ServerResponse }
}) => {
  const cookies = new Cookies(appContext.ctx.req, appContext.ctx.res)
  const token = cookies.get('t')
  return {
    token,
  }
}

export default MyApp
