import React from 'react'
import Layout from '../components/Layout'
import ListOfCategories from '../containers/ListOfCategories'
import ListOfPhotoCards from '../containers/ListOfPhotoCards'

const Home = () => {
  return (
    <Layout title="Petgram - your favorite app for pets">
      <ListOfCategories />
      <ListOfPhotoCards />
    </Layout>
  )
}

export default Home
