'use client'
import Auth from '@/ui/auth'
import HeaderLogo from '@/ui/header/headerLogo'

export default function BasicHeader() {
  return (
    <header className="flex justify-between items-center border-b bg-white z-50 sticky top-0 left-0 px-4 sm:px-10 w-full h-[7.5rem] ">
      <HeaderLogo />
      <Auth />
    </header>
  )
}
