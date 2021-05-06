import React from 'react'
import Layout from '../components/Layout'
import ListOfPhotoCards from '../containers/ListOfPhotoCards'

const Home = () => {
  return (
    <Layout title="Petgram - your favorite app for pets">
      <ListOfPhotoCards />
    </Layout>
  )
}

export default Home
