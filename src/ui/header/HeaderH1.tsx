'use client'
import { useWindowScroll } from '@uidotdev/usehooks'
interface HeaderH1Props {
  title: string
  container?: boolean
}
export default function HeaderH1({ title, container = false }: HeaderH1Props) {
  const [{ y }] = useWindowScroll()

  return (
    <header
      className={`sticky top-[7.5rem] left-0 -mt-1.5 -mx-4 sm:-mx-10 py-4 z-30 mb-2.5 bg-white  ${
        y && y > 10 && 'shadow border-b'
      }`}
    >
      <h1
        className={`text-4xl font-extrabold  text-primary    ${
          container
            ? 'max-w-[1500px] mx-auto max-[1516px]:px-4 max-[1540px]:sm:px-10'
            : 'px-4 sm:px-10 '
        }`}
      >
        {title}
      </h1>
    </header>
  )
}
