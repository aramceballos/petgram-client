import React from 'react'
import axios from 'axios'
import Cookies from 'cookies'

import Layout from '../components/Layout'
import ListOfCategoriesComponent from '../components/ListOfCategories'
import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'
import { IncomingMessage, ServerResponse } from 'http'

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
  return (
    <Layout title="Petgram - your favorite app for pets">
      <ListOfCategoriesComponent categories={categories} />
      <ListOfPhotoCardsComponent posts={posts} />
    </Layout>
  )
}

export default Home
