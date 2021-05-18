import React from 'react'
import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}) => {
  const cookies = new Cookies(req, res)
  const token = cookies.get('t')

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  return { props: {} }
}

const User = () => {
  return <div>User info page</div>
}

export default User
