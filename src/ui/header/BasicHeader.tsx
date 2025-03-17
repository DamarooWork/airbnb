'use client'
import Auth from '@/ui/header/auth'
import HeaderLogo from '@/ui/header/headerLogo'
import CreateBookingBtn from './CreateBookingBtn'

export default function BasicHeader() {
  return (
    <header className="flex justify-between items-center border-b bg-white z-50 sticky top-0 left-0 px-4 sm:px-10 w-full h-[7.5rem] ">
      <section className="flex-1">
        <HeaderLogo />
      </section>
      <section className="flex gap-2">
        <CreateBookingBtn />
        <Auth />
      </section>
    </header>
  )
}
