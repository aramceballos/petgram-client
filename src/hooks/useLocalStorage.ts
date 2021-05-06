import { useState } from 'react'

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (e) {
      return false
    }
  })

  const setLocalStorage = (value: string) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setLocalStorage]
}
