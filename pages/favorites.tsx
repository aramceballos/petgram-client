import React from 'react'
import axios from 'axios'
import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'
import styled from 'styled-components'
import Link from 'next/link'
import Layout from '../components/Layout'

const Container = styled.div`
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

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

type Props = {
  posts: IPost[]
}

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

  let posts = []

  try {
    const res = await axios(`http://localhost:5000/api/posts/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    posts = res.data.data
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
      posts,
    },
  }
}

const Favorites = ({ posts }: Props) => {
  return (
    <Layout title="Favorites">
      <Container>
        {posts.map((post) => (
          <ImageWrapper key={post.id}>
            <Link href={`/post/${post.id}`}>
              <Image src={post.image_url} alt={post.username + '-image'} />
            </Link>
          </ImageWrapper>
        ))}
      </Container>
    </Layout>
  )
}

export default Favorites
