import React from 'react'
import { Heart } from '@styled-icons/evil/Heart'

import { Button } from './styles'

type Props = {
  liked: boolean
  onClick: () => void
}

const LikeButton = ({ liked, onClick }: Props) => {
  // const Icon = liked ? Heart : Heart

  return (
    <Button onClick={onClick}>
      <Heart size="34px" />
    </Button>
  )
}

export default LikeButton
