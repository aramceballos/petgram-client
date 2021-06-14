import ReactDOM from 'react-dom'
import React, { useEffect } from 'react'
import Link from 'next/link'

import {
  ModalContainer,
  Container,
  BarsContainer,
  Bar,
  InnerBar,
  UserWrapper,
  SecondSection,
  Avatar,
  NameText,
  ImageWrapper,
  Img,
  Controls,
  GoBack,
  Next,
} from './styles'
import Loader from '../Loader'

type Props = {
  open: boolean
  loading: boolean
  story: IPost
  onClose: () => void
  onBack: () => void
  onNext: () => void
  stories: IPost[]
  currentStoryIndex: number
}

const Story = ({
  open,
  loading,
  story,
  onClose,
  onBack,
  onNext,
  stories,
  currentStoryIndex,
}: Props) => {
  if (!open) return null

  useEffect(() => {
    const jumpToNextStory = setTimeout(() => {
      onNext()
    }, 5000)

    return () => {
      clearTimeout(jumpToNextStory)
    }
  }, [story])

  return ReactDOM.createPortal(
    <ModalContainer>
      <ImageWrapper>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Img src={story.image_url} alt="story_image" />
            <Controls>
              <GoBack onClick={onBack}></GoBack>
              <Next onClick={onNext}></Next>
            </Controls>
          </>
        )}
      </ImageWrapper>
      <Container>
        {!loading && (
          <>
            <BarsContainer>
              {stories &&
                stories.map(({ id }, i) => (
                  <Bar key={id} width={`${(1 / stories.length) * 100}%`}>
                    <InnerBar
                      highlighted={currentStoryIndex >= i}
                      showAnimation={currentStoryIndex === i}
                    />
                  </Bar>
                ))}
            </BarsContainer>
            <SecondSection>
              <UserWrapper>
                <Link href={`/${story.username}`}>
                  <a>
                    <Avatar
                      src="/images/profile_placeholder.jpeg"
                      alt={`${story.username}-avatar`}
                    />
                  </a>
                </Link>
                <Link href={`/${story.username}`}>
                  <NameText>{story.username}</NameText>
                </Link>
              </UserWrapper>
              <div onClick={onClose}>
                <svg
                  aria-label="Close"
                  fill="#ffffff"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    clipRule="evenodd"
                    d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </SecondSection>
          </>
        )}
      </Container>
    </ModalContainer>,
    document.body
  )
}

export default Story
