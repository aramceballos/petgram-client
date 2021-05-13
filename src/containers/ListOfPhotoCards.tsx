import React from 'react'

import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'
import { useGetRequest } from '../hooks/useRequest'

const ListOfPhotoCards = () => {
  const { data: posts, loading } = useGetRequest('/p')

  return <ListOfPhotoCardsComponent posts={posts} loading={loading} />
}

export default ListOfPhotoCards
