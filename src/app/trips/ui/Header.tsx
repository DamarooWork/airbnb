'use client'

import { useWindowScroll } from '@uidotdev/usehooks'

export default function Header() {
  const [{ y }] = useWindowScroll()
  return (
    <header
      className={`sticky top-[7.5rem] left-0 -my-4 -mx-4 sm:-mx-10 py-4 mb-4 z-30 bg-white ${
        y && y > 10 && 'shadow border-b'
      }`}
    >
      <h1 className="text-4xl font-extrabold max-w-[1500px] mx-auto max-[1540px]:px-4 max-[1540px]:sm:px-10  text-primary">
        Your trips
      </h1>
    </header>
  )
}
