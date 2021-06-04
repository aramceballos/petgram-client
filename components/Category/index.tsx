import React from 'react'
import Link from 'next/link'
import { A, Image } from './styles'

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg'

const Category = ({ image_url = DEFAULT_IMAGE, path = '' }) => (
  <Link href={path}>
    <A>
      <Image src={image_url} alt="category image" />
    </A>
  </Link>
)

export default Category
