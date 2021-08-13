import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import {
  Article,
  Header,
  Avatar,
  NameText,
  ImgWrapper,
  Img,
  HeartContainer,
  Heart,
  BottomSection,
  Button,
  LikedBy,
  UserLink,
  Description,
  PostDateText,
} from './styles'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const parseDate = (date: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const [year, month, day] = date.split(' ')[0].split('-')
  return `${months[parseInt(month) - 1]} ${day}, ${year}`
}

const PhotoCard = ({
  id,
  image_url = DEFAULT_IMAGE,
  username,
  likes,
  description,
  post_date,
}: IPost) => {
  const [, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [liked, setLiked] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [userInfo, setUserInfo] = useState<IUser>()
  const [lastClick, setLastClick] = useState(0)
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

  useEffect(() => {
    if (likes) {
      const like =
        likes[Math.floor(Math.random() * (likes.length - 1 - 0 + 1)) + 0]

      getUserById(like.user_id)
    }
  }, [])

  useEffect(() => {
    if (showHeart) {
      setTimeout(() => {
        setShowHeart(false)
      }, 1200)
    }
  }, [showHeart])

  const getUserById = async (id: number) => {
    try {
      const res = await axios(`http://localhost:5000/api/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserInfo(res.data.data)
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        cookies.set('t')
      }
      console.error(error.response?.data?.message)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    setLiked(!liked)

    if (!liked) {
      const response = await fetch(
        `http://localhost:5000/api/like?post_id=${id}`,
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
        `http://localhost:5000/api/unlike?post_id=${id}`,
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

  const likePost = async () => {
    if (!liked) {
      setLiked(true)
      const response = await fetch(
        `http://localhost:5000/api/like?post_id=${id}`,
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
        <Img
          onClick={() => {
            setLastClick(Date.now())
            if (Date.now() - lastClick < 400) {
              setShowHeart(true)
              likePost()
            }
          }}
          width={375}
          height={200}
          src={image_url}
        />
        {showHeart && (
          <HeartContainer>
            <Heart
              aria-label="Unlike"
              fill="#fffd"
              height="80"
              viewBox="0 0 48 48"
              width="80"
            >
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </Heart>
          </HeartContainer>
        )}
      </ImgWrapper>
      <BottomSection>
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
        {userInfo && (
          <LikedBy>
            Liked by{' '}
            <Link href={`/${userInfo?.username}`}>
              <UserLink>{userInfo?.username}</UserLink>
            </Link>
            {likes && likes.length > 1 && <> and others</>}
          </LikedBy>
        )}

        <Description>
          <Link href={`/${username}`}>
            <UserLink>{username}</UserLink>
          </Link>{' '}
          {description}
        </Description>
        <PostDateText dateTime={post_date}>{parseDate(post_date)}</PostDateText>
      </BottomSection>
    </Article>
  )
}

export default PhotoCard
