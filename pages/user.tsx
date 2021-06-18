import React, { useEffect, useState } from 'react'
import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Layout from '../components/Layout'

const Container = styled.div`
  padding-bottom: 70px;
`

const UserContainer = styled.div`
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

const Button = styled.button`
  border-radius: 3px;
  color: #d80000;
  height: 32px;
  display: block;
  width: 90%;
  text-align: center;
  border: 1px solid #c7c7c7;
  margin: 20px auto 0;

  &[disabled] {
    opacity: 0.3;
  }

  &:hover {
    background: #e4e4e4;
    cursor: pointer;
  }
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
  const [token, setCookie] = useCookies(['t'])
  const [userId, setUserId] = useState<string | null>('')
  const [username, setUsername] = useState<string | null>('')
  const [name, setName] = useState<string | null>('')
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  useEffect(() => {
    setUserId(window.localStorage.getItem('userInfo-id'))
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

  useEffect(() => {
    userId && getPosts()
  }, [userId])

  const handleClick = () => {
    window.localStorage.removeItem('userInfo-id')
    window.localStorage.removeItem('userInfo-name')
    window.localStorage.removeItem('userInfo-username')
    setCookie('t', '')
    window.location.reload()
  }

  const getPosts = async () => {
    try {
      const res = await axios(`http://localhost:5000/api/p?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token.t}`,
        },
      })
      setUserPosts(res.data.data)
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setCookie('t', '')
        window.location.reload()
      }
      console.error(error.response?.data?.message)
    }
  }

  return (
    <Layout title="User">
      <Container>
        <UserContainer>
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
        </UserContainer>
        <NameContainer>
          <Name>{name}</Name>
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
        <Button onClick={handleClick}>Log out</Button>
      </Container>
    </Layout>
  )
}

export default User
