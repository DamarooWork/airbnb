import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <footer className=" border-t  w-full bg-gray-50 mt-8">
      <section className="h-full max-w-[1500px] mx-auto px-4 max-[1540px]:sm:px-10 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold">Airbnb</h3>
            <Link className="hover:underline w-fit" href={'/search'}>
              Search
            </Link>
            <Link className="hover:underline w-fit" href={'/sign-in'}>
              Sign In
            </Link>
            <Link className="hover:underline w-fit" href={'/sign-up'}>
              Sign Up
            </Link>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold">Hosting</h3>
            <Link
              className="hover:underline w-fit"
              href={'/host/create-listing'}
            >
              Airbnb your home
            </Link>
            <Link className="hover:underline w-fit" href={'/host/listings'}>
              Listings
            </Link>
            <Link className="hover:underline w-fit" href={'/trips'}>
              Trips
            </Link>
          </section>
        </section>
        <section className=" border-t-[1px]  w-full flex justify-between items-center mt-8 pt-6">
          <h2>
            © {date} Airbnb clone by{' '}
            <Link className='font-medium hover:underline' href="https://vk.com/damaroo" target="_blank">
              Damaroo
            </Link>
          </h2>
          <Link
            className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform aspect-square"
            href="https://github.com/DamarooWork"
            target="_blank"
          >
            <Image
              className="size-10 min-h-10 min-w-10  "
              src={'/images/githubLight.png'}
              alt="Github logo"
              width={44}
              height={44}
            />
          </Link>
        </section>
      </section>
    </footer>
  )
}
