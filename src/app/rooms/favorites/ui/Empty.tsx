import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function EmptyFavoriteList() {
  return (
    <section>
      <p>No favorites listings yet!</p>
      <Link className=" flex flex-row gap-2" href={'/search'}>
        Go to home page <ArrowUpRightIcon className="size-5" />
      </Link>
    </section>
  )
}
