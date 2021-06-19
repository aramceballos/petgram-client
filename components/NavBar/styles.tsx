import styled from 'styled-components'
import LinkRouter from 'next/link'

type TImageContianer = {
  showBorder: boolean
}

export const Nav = styled.nav`
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #e0e0e0;
  bottom: 0;
  display: flex;
  height: calc(44px + env(safe-area-inset-bottom));
  justify-content: space-around;
  left: 0;
  margin: 0 auto;
  max-width: 500px;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
`

export const Link = styled(LinkRouter)`
  align-items: center;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`

export const ImageContainer = styled.div<TImageContianer>`
  border-radius: 50%;
  border: ${({ showBorder }) =>
    showBorder ? '1px solid #000' : '1px solid #0000'};
  width: 28px;
  height: 28px;
  padding: 1px;
`

export const Img = styled.img`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`
