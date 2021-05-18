import React from 'react'
import Link from 'next/link'

import LikeButton from '../LikeButton'
import { Article, Header, Avatar, NameText, ImgWrapper, Img } from './styles'
import { useGravatar } from '../../hooks/useGravatar'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const PhotoCard = ({ image_url = DEFAULT_IMAGE, username, email }: IPost) => {
  const [avatarUrl] = useGravatar(email)

  return (
    <Article>
      <Header>
        <Link href={`/${username}`}>
          <a>
            <Avatar src={avatarUrl} alt={`${username}-avatar`} />
          </a>
        </Link>
        <Link href={`/${username}`}>
          <NameText>{username}</NameText>
        </Link>
      </Header>
      <ImgWrapper>
        <Img width={375} height={200} src={image_url} />
      </ImgWrapper>
      <LikeButton liked={false} onClick={() => {}} />
    </Article>
  )
}

export default PhotoCard
