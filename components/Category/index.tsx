import React from 'react'
import { Link, Image } from './styles'

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg'

const Category = ({ image_url = DEFAULT_IMAGE, path = '', category }) => (
  <Link href={path}>
    <a>
      <Image src={image_url} alt="category image" />
      {category}
    </a>
  </Link>
)

export default Category
