import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IMenuLink {
  id: number
  href: string
  title: string
}
const MenuLinks: IMenuLink[] = [
  {
    id: 1,
    href: '/trips',
    title: 'My trips',
  },
  {
    id: 2,
    href: '/host/listings',
    title: 'My listings',
  },
  {
    id: 3,
    href: '/host/create-listing',
    title: 'Airbnb your home',
  },
]
export default function Menu() {
  const pathname = usePathname()
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement
    if (elem && matchMedia('(pointer:fine)').matches) {
      elem?.blur()
    }
  }
  return (
    <div
      onClick={handleClick}
      className="dropdown dropdown-end [@media(pointer:fine)]:dropdown-hover "
    >
      <div
        tabIndex={0}
        role="button"
        className="btn rounded-full p-1 px-1.5 h-[3rem] min-h-[3rem] bg-white hover:bg-white border-slate-300 hover:border-slate-400 duration-300 transition-colors"
      >
        <Bars3Icon className="w-9 h-auto text-slate-600 hover:text-slate-700" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white hover:bg-white border-slate-300 hover:border-slate-400 rounded-box z-1 w-52 p-2 shadow-xl font-semibold"
      >
        {MenuLinks.map((link: IMenuLink) => (
          <li
            key={link.id}
            className={`${pathname === link.href ? 'disabled' : ''}`}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
