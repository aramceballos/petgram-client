import React from 'react'
import { useRouter } from 'next/router'
import { Home } from '@styled-icons/fluentui-system-regular/Home'
import { Heart } from '@styled-icons/evil/Heart'
import { User } from '@styled-icons/evil/User'
import { Nav, Link } from './styles'

const NavBar = () => {
  const router = useRouter()

  if (router.pathname === '/login') {
    return <></>
  }

  return (
    <Nav>
      <Link href="/">
        <Home color={router.pathname === '/' ? '#000' : '#888'} size="32px" />
      </Link>
      <Link href="/f">
        <Heart color={router.pathname === '/f' ? '#000' : '#888'} size="42px" />
      </Link>
      <Link href="/user">
        <User
          color={router.pathname === '/user' ? '#000' : '#888'}
          size="40px"
        />
      </Link>
    </Nav>
  )
}

export default NavBar
