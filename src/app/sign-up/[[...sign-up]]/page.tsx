import Loader from '@/ui/Loader'
import { SignUp } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center flex-grow py-10">
        <SignUp />
    </section>
  )
}
