import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCookies } from 'react-cookie'

import {
  Article,
  Header,
  Avatar,
  NameText,
  ImgWrapper,
  Img,
  Button,
} from './styles'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const PhotoCard = ({
  id,
  image_url = DEFAULT_IMAGE,
  username,
  likes,
}: IPost) => {
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [liked, setLiked] = useState(false)
  const [cookies] = useCookies(['t'])
  const token = cookies['t']

  useEffect(() => {
    setUserId(window.localStorage.getItem('userInfo-id') as string)
  }, [])

  useEffect(() => {
    const like =
      likes &&
      likes.some((like: ILike) => like.user_id === parseInt(userId as string))
    if (like) {
      setLiked(true)
    }
  }, [userId])

  const handleClick = async () => {
    setLoading(true)
    setLiked(!liked)

    if (!liked) {
      const response = await fetch(
        `http://localhost:5000/api/p/l?post_id=${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json())
      if (response.status === 'success') {
        setLoading(false)
      } else {
        console.error('error on like')
        setLoading(false)
      }
    } else {
      const response = await fetch(
        `http://localhost:5000/api/p/ul?post_id=${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json())
      if (response.status === 'success') {
        setLoading(false)
      } else {
        console.error('error on like')
        setLoading(false)
      }
    }
  }

  return (
    <Article>
      <Header>
        <Link href={`/${username}`}>
          <a>
            <Avatar
              src="/images/profile_placeholder.jpeg"
              alt={`${username}-avatar`}
            />
          </a>
        </Link>
        <Link href={`/${username}`}>
          <NameText>{username}</NameText>
        </Link>
      </Header>
      <ImgWrapper>
        <Img width={375} height={200} src={image_url} />
      </ImgWrapper>
      <Button onClick={handleClick}>
        {liked ? (
          <svg
            aria-label="Unlike"
            fill="#ed4956"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        ) : (
          <svg
            aria-label="Like"
            fill="#262626"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        )}
      </Button>
    </Article>
  )
}

export default PhotoCard
