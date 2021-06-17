import styled from 'styled-components'

type TContainer = {
  onClick: () => void
}

export const Container = styled.div<TContainer>`
  border-radius: 50%;
  background: linear-gradient(45deg, orange, #962b96);
  padding: 2px;
  width: 72px;
  height: 72px;
`
export const Image = styled.img`
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  height: auto;
  overflow: hidden;
  object-fit: cover;
  height: 68px;
  width: 68px;
`
