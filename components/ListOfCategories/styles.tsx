import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  overflow: scroll;
  width: 100%;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  padding: 16px 0;
  background-color: #fafafa;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.li`
  padding: 0 8px;
`
