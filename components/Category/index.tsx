import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import { Container, Image } from './styles'
import Story from '../Story'

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg'

const Category = ({ image_url = DEFAULT_IMAGE, id }: ICategory) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [stories, setStories] = useState<IPost[]>([])
  const [cookies] = useCookies(['t'])
  const token = cookies['t']

  const handleClick = async () => {
    setOpen(true)

    try {
      setLoading(true)
      const res = await axios('http://localhost:5000/api/p', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const filteredResults = res.data.data.filter(
        (item: IPost) => item.category_id === id
      )
      setStories(filteredResults)
      setLoading(false)
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        cookies.set('t')
      }
      console.error(error.response?.data?.message)
    }
    setLoading(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleNext = () => {
    if (currentStoryIndex === stories.length - 1) {
      handleClose()
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentStoryIndex === 0) {
      handleClose()
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
  }

  return (
    <>
      <Container onClick={handleClick}>
        <Image src={image_url} alt="category image" />
      </Container>
      <Story
        open={open}
        loading={loading}
        story={stories[currentStoryIndex]}
        onClose={handleClose}
        onNext={handleNext}
        onBack={handleBack}
        stories={stories}
        currentStoryIndex={currentStoryIndex}
      />
    </>
  )
}

export default Category
