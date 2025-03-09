import { useEffect, useState } from 'react'
interface useDebounceProps {
value: Value
delay?: number
}
type Value = string | number | [] | {}

export function useDebounce({value, delay = 300}: useDebounceProps): Value {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value)
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [value, delay])
  return debounced
}
