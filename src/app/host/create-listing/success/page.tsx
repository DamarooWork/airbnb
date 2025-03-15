import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <section className="flex flex-col text-center grow-0 justify-center items-center gap-3 mx-auto w-fit p-8 mt-8 border rounded">
      <CheckCircleIcon className="w-12 h-auto text-green-600" />
      <header>
        <h1 className="mb-4 text-4xl font-extrabold">
          Your Listing Has Been Published!
        </h1>
      </header>
      <section className="flex gap-2 font-semibold justify-center items-center">
        <Link
          href={'/host/create-listing'}
          className="px-4 text-white rounded-full bg-primary p-4"
        >
          Add another
        </Link>
        <Link
          className="text-primary  p-4 mt-2 underline"
          href={'/host/listings'}
        >
          Browse your listings
        </Link>
      </section>
    </section>
  )
}
