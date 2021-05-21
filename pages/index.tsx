import React, { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'cookies'
import { IncomingMessage, ServerResponse } from 'http'
import { useCookies } from 'react-cookie'

import Layout from '../components/Layout'
import ListOfCategoriesComponent from '../components/ListOfCategories'
import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'

type Props = {
  posts: IPost[]
  categories: ICategory[]
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

  let categories = []
  let posts = []

  try {
    const res = await axios('http://localhost:5000/api/c', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    categories = res.data.data
  } catch (error) {
    if (
      error.response.data.message === 'Missing or malformed JWT' ||
      error.response.data.message === 'Invalid or expired JWT'
    ) {
      cookies.set('t')
    }
    console.error(error.response.data.message)
  }

  try {
    const res = await axios('http://localhost:5000/api/p', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    posts = res.data.data
  } catch (error) {
    if (
      error.response.data.message === 'Missing or malformed JWT' ||
      error.response.data.message === 'Invalid or expired JWT'
    ) {
      cookies.set('t')
    }
    console.error(error.response.data.message)
  }

  return {
    props: {
      categories,
      posts,
    },
  }
}

const Home = ({ categories, posts }: Props) => {
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
    <Layout title="Petgram - your favorite app for pets">
      <ListOfCategoriesComponent categories={categories} />
      <ListOfPhotoCardsComponent posts={posts} />
    </Layout>
  )
}

export default Home
