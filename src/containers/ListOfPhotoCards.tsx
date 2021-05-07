import React, { useState, useEffect } from 'react'

import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'

const usePostsData = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:5000/p')
      .then((res) => res.json())
      .then((response) => {
        setPosts(response.data)
        setLoading(false)
      })
  }, [])

  return { posts, loading }
}

const ListOfPhotoCards = () => {
  const { posts, loading } = usePostsData()

  return <ListOfPhotoCardsComponent posts={posts} loading={loading} />
}

export default ListOfPhotoCards
