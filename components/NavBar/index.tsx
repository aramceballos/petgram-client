import React from 'react'
import { Home } from '@styled-icons/fluentui-system-regular/Home'
import { Heart } from '@styled-icons/evil/Heart'
import { User } from '@styled-icons/evil/User'
import { Nav, Link } from './styles'

const NavBar = () => (
  <Nav>
    <Link
      // exact
      // activeStyle={{
      //   color: '#000',
      // }}
      href="/"
    >
      <Home size="32px" />
    </Link>
    <Link
      // exact
      // activeStyle={{
      //   color: '#000',
      // }}
      href="/f"
    >
      <Heart size="42px" />
    </Link>
    <Link
      // exact
      // activeStyle={{
      //   color: '#000',
      // }}
      href="/user"
    >
      <User size="40px" />
    </Link>
  </Nav>
)

export default NavBar
