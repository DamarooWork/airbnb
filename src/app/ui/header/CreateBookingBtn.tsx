import Link from 'next/link'

export default function CreateBookingBtn() {
  return (
    <Link
      href={'/host/create-listing'}
      className="text-slate-800 py-2 px-4 flex items-center hover:bg-slate-100 rounded-full font-semibold cursor-pointer text-center"
    >
      Airbnb your home
    </Link>
  )
}
