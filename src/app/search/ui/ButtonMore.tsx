'use client'

import { useState } from 'react'

interface ButtonMoreProps {
  loadMore: (limit: number) => Promise<void>
}
export default function ButtonMore({ loadMore }: ButtonMoreProps) {
  const [limit, setLimit] = useState<number>(0)
  const handleClick = () => {
    const newLimit = limit + 5
    setLimit(newLimit)
    loadMore(newLimit)
  }
  return (
    <button
      onClick={handleClick}
      className="text-2xl p-4 border-red-500 border-2 rounded-full mt-8 text-center"
    >
      More
    </button>
  )
}
