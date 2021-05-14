import React from 'react'
import { Heart } from '@styled-icons/evil/Heart'

import { Button } from './styles'

type Props = {
  liked: boolean
  onClick: () => void
}

const LikeButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Heart size="38px" />
    </Button>
  )
}

export default LikeButton
