import { useState } from 'react'

export const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return { value, onChange }
}
