import React, { useEffect, useState } from 'react'

import ListOfCategoriesComponent from '../components/ListOfCategories'

const useCategoriesData = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:5000/c')
      .then((res) => res.json())
      .then((response) => {
        setCategories(response.data)
        setLoading(false)
      })
  }, [])

  return { categories, loading }
}

const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData()

  return <ListOfCategoriesComponent categories={categories} loading={loading} />
}

export default React.memo(ListOfCategories)
