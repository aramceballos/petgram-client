import React from 'react'
// import { FavButton } from '../FavButton'
// import { ToggleLikeMutation } from '../../container/ToggleLikeMutation'
import { Link } from 'react-router-dom'

import LikeButton from '../LikeButton'
// import { useNearScreen } from '../../hooks/useNearScreen'

import { Article, ImgWrapper, Img } from './styles'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const PhotoCard = ({ id, image_url = DEFAULT_IMAGE }: IPost) => {
  // const [show, element] = useNearScreen()

  return (
    <Article>
      {/* {show && ( */}
      <>
        <Link to={`/detail/${id}`}>
          <ImgWrapper>
            <Img src={image_url} />
          </ImgWrapper>
        </Link>
        <LikeButton liked={false} onClick={() => {}} />
      </>
      {/* )} */}
    </Article>
  )
}

export default PhotoCard
