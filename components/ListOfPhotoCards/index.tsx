import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

import PhotoCard from '../PhotoCard'
import { List } from './styles'

type Props = {
  posts: IPost[]
  loading?: boolean
}

const ListOfPhotoCardsComponent = ({ posts, loading }: Props) => {
  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', marginTop: '35px' }}>
          <Skeleton
            style={{ marginLeft: '15px' }}
            animation="wave"
            variant="circle"
            width={30}
            height={30}
          />
          <Skeleton
            style={{ marginLeft: '15px' }}
            animation="wave"
            variant="text"
            width="80%"
          />
        </div>
        <Skeleton
          style={{ marginTop: '15px' }}
          animation="wave"
          variant="rect"
          height={200}
        />
        <div style={{ display: 'flex', marginTop: '35px' }}>
          <Skeleton
            style={{ marginLeft: '15px' }}
            animation="wave"
            variant="circle"
            width={30}
            height={30}
          />
          <Skeleton
            style={{ marginLeft: '15px' }}
            animation="wave"
            variant="text"
            width="80%"
          />
        </div>
        <Skeleton
          style={{ marginTop: '15px' }}
          animation="wave"
          variant="rect"
          height={200}
        />
      </div>
    )
  }

  return (
    <List>
      {posts && posts.map((post) => <PhotoCard key={post.id} {...post} />)}
    </List>
  )
}

export default ListOfPhotoCardsComponent
