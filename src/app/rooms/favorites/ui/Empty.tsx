import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function EmptyFavoriteList() {
  return (
    <section className="text-2xl text-primary">
      <h3 className="">No favorites listings yet</h3>
      <Link className=" flex flex-row gap-2 mt-4 items-center font-semibold" href={'/search'}>
        Go to home page <ArrowUpRightIcon className="size-5" />
      </Link>
    </section>
  )
}
