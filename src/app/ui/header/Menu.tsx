import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuProps {}
export default function Menu({}: MenuProps) {
  const pathname = usePathname()
  return (
    <section className="">
      <div className="dropdown dropdown-end dropdown-hover ">
        <div
          tabIndex={0}
          role="button"
          className="btn rounded-full p-1 px-1.5 h-[3rem] min-h-[3rem] bg-white hover:bg-white border-slate-300 hover:border-slate-400 duration-300 transition-colors"
        >
          <Bars3Icon className="w-9 h-auto text-slate-600 hover:text-slate-700" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white hover:bg-white border-slate-300 hover:border-slate-400 rounded-box z-1 w-52 p-2 shadow-sm font-semibold"
        >
          <li className={`${pathname === '/trips' ? 'disabled' : ''}`}>
            <Link href={'/trips'}>My trips</Link>
          </li>
          <li className={`${pathname === '/host/listings' ? 'disabled' : ''}`}>
            <Link href={'/host/listings'}>My listings</Link>
          </li>
          <li
            className={`${
              pathname === '/host/create-listing' ? 'disabled' : ''
            }`}
          >
            <Link href={'/host/create-listing'}>Airbnb your home</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
