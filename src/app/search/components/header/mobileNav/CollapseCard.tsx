import { ReactNode } from 'react'

export default function CollapseCard({
  children,
  isCurrent,
  title,
  index,
  handleCurrentUpdate,
}: {
  children: ReactNode
  isCurrent: boolean
  title: string
  index: number
  handleCurrentUpdate: (index: number) => void
}) {
  return (
    <li
      onClick={() => handleCurrentUpdate(index)}
      className={`${
        isCurrent ? 'shadow-2xl ' : 'shadow-lg cursor-pointer'
      } bg-background  rounded-lg p-4 my-2`}
    >
      <header className="">
        <h2
          className={`${
            isCurrent ? 'text-xl text-gray-800' : 'text-gray-600 '
          }  font-semibold `}
        >
          {title}
        </h2>
      </header>
      {isCurrent && <section>{children}</section>}
    </li>
  )
}
