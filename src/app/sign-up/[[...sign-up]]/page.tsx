import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center flex-grow py-10">
        <SignUp />
    </section>
  )
}
