import { ReactNode } from 'react'
import BasicHeader from '../../ui/header/BasicHeader'
interface LayoutHostProps {
  children: ReactNode
}
export default function LayoutHost({ children }: LayoutHostProps) {
  return (
    <>
      <BasicHeader />
      <main className="mx-auto p-4  sm:px-10">{children}</main>
    </>
  )
}
