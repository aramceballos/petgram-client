import React from 'react'
import { Link, Image } from './styles'

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg'

const Category = ({ image_url = DEFAULT_IMAGE, path = '', category }) => (
  <Link to={path}>
    <Image src={image_url} alt="category image" />
    {category}
  </Link>
)

export default Category
