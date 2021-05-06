import React from 'react'

import { List } from './styles'
import Photocard from '../PhotoCard'

type Props = {
  posts: IPost[]
}

const ListOfPhotoCardsComponent = ({ posts = [] }: Props) => {
  return (
    <List>
      {posts.map((post) => (
        <Photocard key={post.id} {...post} />
      ))}
    </List>
  )
}

export default ListOfPhotoCardsComponent
