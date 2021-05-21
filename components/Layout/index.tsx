import React from 'react'
import Head from 'next/head'

type Props = {
  children: React.ReactNode
  description?: string
  title?: string
}

const Layout = ({ children, title, description }: Props) => {
  return (
    <>
      <Head>
        {title && <title>{title} | Petgram</title>}
        {description && <meta name="description" content={description} />}
      </Head>
      {children}
    </>
  )
}

export default Layout
