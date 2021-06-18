import React, { useEffect } from 'react'
import Cookies from 'cookies'
import Image from 'next/image'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import Layout from '../components/Layout'

type Props = {
  userInfo: IUser
  userPosts: IPost[]
}

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

const PostsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;
`

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100%;
`

const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res)
  const token = cookies.get('t')

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  let userInfo = []
  let userPosts = []

  try {
    const res = await axios(
      `http://localhost:5000/api/u?username=${context?.params?.username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    userInfo = res.data.data
  } catch (error) {
    if (
      error.response?.data?.message === 'Missing or malformed JWT' ||
      error.response?.data?.message === 'Invalid or expired JWT'
    ) {
      cookies.set('t')
    }
    console.error(error.response?.data?.message)
  }

  try {
    const res = await axios(
      `http://localhost:5000/api/p?user_id=${userInfo.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    userPosts = res.data.data
  } catch (error) {
    if (
      error.response?.data?.message === 'Missing or malformed JWT' ||
      error.response?.data?.message === 'Invalid or expired JWT'
    ) {
      cookies.set('t')
    }
    console.error(error.response?.data?.message)
  }

  return {
    props: {
      userInfo,
      userPosts,
    },
  }
}

const User = ({ userInfo, userPosts }: Props) => {
  const [, setCookie] = useCookies(['t'])

  useEffect(() => {
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
    <Layout title={`${userInfo.name} (@${userInfo.username})`}>
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
            <Username>{userInfo.username}</Username>
          </section>
        </Container>
        <NameContainer>
          <Name>{userInfo.name}</Name>
        </NameContainer>
        <PostsContainer>
          {userPosts.length > 0 &&
            userPosts.map((post) => (
              <ImageWrapper key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <Img src={post.image_url} alt={post.description} />
                </Link>
              </ImageWrapper>
            ))}
        </PostsContainer>
      </div>
    </Layout>
  )
}

export default User
