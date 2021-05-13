import React from 'react'

import ListOfCategoriesComponent from '../components/ListOfCategories'
import { useGetRequest } from '../hooks/useRequest'

const ListOfCategories = () => {
  const { data: categories, loading } = useGetRequest('/c')

  return (
    <ListOfCategoriesComponent
      categories={categories as ICategory[]}
      loading={loading}
    />
  )
}

export default React.memo(ListOfCategories)
