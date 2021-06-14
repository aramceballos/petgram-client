import styled, { css } from 'styled-components'

type TBar = {
  width: string
}

type TInnerBar = {
  highlighted: boolean
  showAnimation: boolean
}

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  outline: 0;
  position: absolute;
  top: 0;
  background-color: #464646;
  z-index: 1000;
`

export const Container = styled.header`
  padding: 20px 16px 32px;
`

export const BarsContainer = styled.div`
  display: flex;
  height: 2px;
  margin: -15px 0 15px;
`

export const Bar = styled.div<TBar>`
  background-color: #a0a0a0bf;
  height: 2px;
  width: ${({ width }) => width};
  margin: 0 1.5px;
  border-radius: 2px;
`

export const InnerBar = styled.div<TInnerBar>`
  background-color: #fff;
  height: 2px;
  border-radius: 2px;
  width: ${({ highlighted }) => (highlighted ? '100%' : '0')};
  ${({ showAnimation }) =>
    showAnimation &&
    css`
      animation-name: bar-width;
      animation-duration: 5s;
      animation-timing-function: linear;
    `}

  @keyframes bar-width {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const SecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Avatar = styled.img`
  width: 32px;
  border-radius: 50%;
`

export const NameText = styled.a`
  text-decoration: none;
  margin-left: 7px;
  color: #fff;
`

export const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: -1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Img = styled.img`
  width: 100%;
`

export const Controls = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
`

export const GoBack = styled.button`
  width: 25%;
`

export const Next = styled.button`
  width: 75%;
`
