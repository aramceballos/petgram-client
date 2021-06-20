import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://api.petgram.club/api'

export const useGetRequest = (endpoint: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tkn')}`,
        },
      })
      .then((res) => {
        setLoading(false)
        setData(res.data.data)
        setMessage(res.data.message)
      })
      .catch((error) => {
        setLoading(false)
        setMessage(error)
      })
  }, [])

  return { data, loading, message }
}
