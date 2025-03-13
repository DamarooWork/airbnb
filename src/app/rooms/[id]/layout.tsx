import BasicHeader from '@/ui/header/BasicHeader'
import { ReactNode } from 'react'
interface LayoutHostProps {
  children: ReactNode
}
export default function LayoutRoom({ children }: LayoutHostProps) {
  return (
    <>
      <BasicHeader />
      <main className="mx-auto p-4  sm:px-10">{children}</main>
    </>
  )
}
