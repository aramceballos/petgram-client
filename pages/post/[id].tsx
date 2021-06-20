import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Cookies from 'cookies'
import PhotoCard from '../../components/PhotoCard'

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

  let post

  try {
    const res = await axios(
      `https://api.petgram.club/api/p/individual/${context?.params?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    post = res.data.data
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
      post,
    },
  }
}

const Post = ({ post }: { post: IPost }) => {
  return <PhotoCard {...post} />
}

export default Post
