import React, { useEffect, useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

import Category from '../Category'
import { List, Item } from './styles'

type Props = {
  categories: ICategory[]
  loading: boolean
}

const ListOfCategoriesComponent = ({ categories, loading }: Props) => {
  const [showFixed, setShowFixed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  return (
    <List>
      {loading ? (
        <>
          <Item>
            <Skeleton
              style={{ marginBottom: '25px' }}
              variant="circle"
              width={68}
              height={68}
            />
          </Item>
          <Item>
            <Skeleton
              style={{ marginBottom: '25px' }}
              variant="circle"
              width={68}
              height={68}
            />
          </Item>
          <Item>
            <Skeleton
              style={{ marginBottom: '25px' }}
              variant="circle"
              width={68}
              height={68}
            />
          </Item>
          <Item>
            <Skeleton
              style={{ marginBottom: '25px' }}
              variant="circle"
              width={68}
              height={68}
            />
          </Item>
        </>
      ) : (
        categories.map((category) => (
          <Item key={category.id}>
            <Category {...category} path={`/pet/${category.id}`} />
          </Item>
        ))
      )}
    </List>
  )
}

export default React.memo(ListOfCategoriesComponent)
