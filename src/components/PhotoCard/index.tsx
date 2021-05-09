import React from 'react'
import { Link } from 'react-router-dom'
import { useGravatar } from '../../hooks/useGravatar'

import LikeButton from '../LikeButton'
import { Article, Header, Avatar, NameText, ImgWrapper, Img } from './styles'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const PhotoCard = ({ image_url = DEFAULT_IMAGE, username, email }: IPost) => {
  const [avatarUrl] = useGravatar(email)

  return (
    <Article>
      <Header>
        <Link to={`/${username}`}>
          <Avatar src={avatarUrl} alt={`${username}-avatar`} />
        </Link>
        <NameText to={`/${username}`}>{username}</NameText>
      </Header>
      <ImgWrapper>
        <Img src={image_url} />
      </ImgWrapper>
      <LikeButton liked={false} onClick={() => {}} />
    </Article>
  )
}

export default PhotoCard
