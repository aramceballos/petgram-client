import styled from 'styled-components'
import Link from 'next/link'

import { fadeIn } from '../../styles/animation'

export const Article = styled.article`
  min-height: 200px;
  margin-bottom: 15px;
  border-radius: 3px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 16px;
`

export const Avatar = styled.img`
  width: 32px;
  border-radius: 50%;
`

export const NameText = styled(Link)`
  text-decoration: none;
  margin-left: 14px;

  &:hover {
    text-decoration: underline;
  }
`

export const ImgWrapper = styled.div`
  display: block;
  height: 0;
  overflow: hidden;
  padding: 56.25% 0 0 0;
  position: relative;
  width: 100%;
`

export const Img = styled.img`
  ${fadeIn()}
  box-shadow: 0 10px 14px rgba(0, 0, 0, 0.2);
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`
