import Auth from '@/app/ui/header/auth'
import CreateBookingBtn from '../../app/ui/header/CreateBookingBtn'
import Logo from '@/app/ui/header/Logo'

export default function BasicHeader() {
  return (
    <header className="flex justify-between items-center border-b bg-white z-50 sticky top-0 left-0 px-4 sm:px-10 w-full h-[7.5rem] ">
      <section className="flex-1">
        <Logo />
      </section>
      <section className="flex gap-2">
        <CreateBookingBtn />
        <Auth />
      </section>
    </header>
  )
}
