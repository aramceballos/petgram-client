import React from 'react'
import { GetStaticProps } from 'next'

import Layout from '../components/Layout'
import ListOfCategoriesComponent from '../components/ListOfCategories'
import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'

type Props = {
  posts: IPost[]
  categories: ICategory[]
}

export const getServerSideProps: GetStaticProps = async () => {
  const response1 = await fetch('http://localhost:5000/api/c')
  const response2 = await fetch('http://localhost:5000/api/p')
  const { data: categories } = await response1.json()
  const { data: posts } = await response2.json()

  return {
    props: {
      posts,
      categories,
    },
  }
}

const Home = ({ posts, categories }: Props) => {
  return (
    <Layout title="Petgram - your favorite app for pets">
      <ListOfCategoriesComponent categories={categories} />
      <ListOfPhotoCardsComponent posts={posts} />
    </Layout>
  )
}

export default Home
