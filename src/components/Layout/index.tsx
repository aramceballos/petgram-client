import React from 'react'
import Helmet from 'react-helmet'

type Props = {
  children: JSX.Element
  description?: string
  title?: string
}

const Layout = ({ children, title, description }: Props) => {
  return (
    <>
      <Helmet>
        {title && <title>{title} | Petgram</title>}
        {description && <meta name="description" content={description} />}
      </Helmet>
      {children}
    </>
  )
}

export default Layout
