import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

import Photocard from '../PhotoCard'
import { List } from './styles'

type Props = {
  posts: IPost[]
  loading: boolean
}

const ListOfPhotoCardsComponent = ({ posts = [], loading }: Props) => {
  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', marginTop: '35px' }}>
          <Skeleton animation="wave" variant="circle" width={30} height={30} />
          <Skeleton
            style={{ marginLeft: '10px' }}
            animation="wave"
            variant="text"
            width="90%"
          />
        </div>
        <Skeleton
          style={{ marginTop: '15px' }}
          animation="wave"
          variant="rect"
          height={200}
        />
        <div style={{ display: 'flex', marginTop: '35px' }}>
          <Skeleton animation="wave" variant="circle" width={30} height={30} />
          <Skeleton
            style={{ marginLeft: '10px' }}
            animation="wave"
            variant="text"
            width="90%"
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
      {posts.map((post) => (
        <Photocard key={post.id} {...post} />
      ))}
    </List>
  )
}

export default ListOfPhotoCardsComponent
