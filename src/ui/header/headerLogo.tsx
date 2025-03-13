import Image from 'next/image'
import Link from 'next/link'

export default function HeaderLogo() {
  return (
    <Link className="flex relative w-[172px] h-[60px]" href={'/'}>
      <Image
        className="object-cover"
        src={'/images/logo.png'}
        fill
        sizes="172px 60px"
        alt="Airbnb logo"
        priority
      />
    </Link>
  )
}
