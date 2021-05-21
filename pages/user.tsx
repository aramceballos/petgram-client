import React, { useEffect, useState } from 'react'
import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'
import Image from 'next/image'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'

import Layout from '../components/Layout'

const Container = styled.div`
  display: flex;
  margin: 16px;
`

const ImageContainer = styled.div`
  margin-right: 28px;
`

const Username = styled.h2`
  font-size: 28px;
  font-weight: 300;
  line-height: 32px;
  margin: -5px 0 -6px;
`

const NameContainer = styled.div`
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  padding: 0 16px 21px;
  text-overflow: ellipsis;
`

const Name = styled.h1`
  font-weight: 600;
  font-size: 14px;
`

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
  const [, setCookie] = useCookies(['t'])
  const [username, setUsername] = useState<string | null>('')
  const [name, setName] = useState<string | null>('')

  useEffect(() => {
    setUsername(window.localStorage.getItem('userInfo-username'))
    setName(window.localStorage.getItem('userInfo-name'))
    if (
      !window.localStorage.getItem('userInfo-id') ||
      !window.localStorage.getItem('userInfo-name') ||
      !window.localStorage.getItem('userInfo-username')
    ) {
      window.localStorage.removeItem('userInfo-id')
      window.localStorage.removeItem('userInfo-name')
      window.localStorage.removeItem('userInfo-username')
      setCookie('t', '')
      window.location.reload()
    }
  }, [])

  return (
    <Layout title="User">
      <div>
        <Container>
          <ImageContainer>
            <Image
              height={77}
              width={77}
              src="/images/profile_placeholder.jpeg"
            />
          </ImageContainer>
          <section>
            <Username>{username}</Username>
          </section>
        </Container>
        <NameContainer>
          <Name>{name}</Name>
        </NameContainer>
      </div>
    </Layout>
  )
}

export default User
