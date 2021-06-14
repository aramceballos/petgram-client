import styled from 'styled-components'

type TContainer = {
  onClick: () => void
}

export const Container = styled.div<TContainer>`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  width: 68px;
  cursor: pointer;
  border-radius: 50%;
`
export const Image = styled.img`
  border: 1px solid #ddd;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  height: auto;
  overflow: hidden;
  object-fit: cover;
  height: 68px;
  width: 68px;
`
