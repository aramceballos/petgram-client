import styled from 'styled-components'

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

export const NameText = styled.a`
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
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`

export const BottomSection = styled.div`
  padding: 0 16px;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 0;
  & svg {
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`

export const LikedBy = styled.div`
  font-size: 14px;
`

export const UserLink = styled.a`
  font-weight: 600;
`
