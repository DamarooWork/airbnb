import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CreateBookingBtn() {
  return (
    <Link
      href={'/host/create-listing'}
      className="text-2xl p-2 sm:px-4 flex justify-center items-center self-start hover:bg-red-100 active:bg-red-200 transition-colors duration-300 ease-in-out rounded-full font-semibold cursor-pointer text-center text-primary -mx-2 sm:-mx-4"
    >
      Airbnb your home <ArrowUpRightIcon className="size-6 ml-2" />
    </Link>
  )
}
