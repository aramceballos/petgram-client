import React, { useState, useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

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

  if (loading)
    return (
      <div style={{ padding: '0 15px' }}>
        <Skeleton
          style={{ marginTop: '15px', borderRadius: '10px' }}
          variant="rect"
          height={200}
        />
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton style={{ marginLeft: '10px' }} variant="text" width="80%" />
        </div>
        <Skeleton
          style={{ marginTop: '15px', borderRadius: '10px' }}
          variant="rect"
          height={200}
        />
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton style={{ marginLeft: '10px' }} variant="text" width="80%" />
        </div>
      </div>
    )

  return <ListOfPhotoCardsComponent posts={posts} />
}

export default ListOfPhotoCards
