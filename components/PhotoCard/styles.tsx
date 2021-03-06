import styled from 'styled-components'

import { fadeIn, bounce } from '../../styles/animation'

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
  cursor: pointer;

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

export const HeartContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Heart = styled.svg`
  ${bounce()}
  opacity: 0;
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
  margin-bottom: 8px;
`

export const UserLink = styled.a`
  font-weight: 600;
  cursor: pointer;
`

export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`

export const PostDateText = styled.time`
  color: #8e8e8e;
  font-size: 10px;
`
