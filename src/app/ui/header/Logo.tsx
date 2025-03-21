import Image from 'next/image'
import Link from 'next/link'
import { useWindowSize } from '@uidotdev/usehooks'
export default function Logo() {
  const size = useWindowSize()
  return (
    <section>
      <Link
        aria-label="Airbnb homepage"
        className="flex relative w-[50px] h-[50px] lg:w-[160px] lg:h-[50px] cursor-pointer"
        href={'/search'}
      >
        {size.width && size.width < 1024 ? (
          <Image
            className="object-contain "
            src={'/logos/airbnbLogoMini.png'}
            fill
            sizes="50px 50px"
            alt="Airbnb mini logo"
          />
        ) : (
          <Image
            className="object-contain "
            src={'/logos/logo.png'}
            fill
            sizes="160px 50px"
            alt="Airbnb logo"
            priority
          />
        )}
      </Link>
    </section>
  )
}
