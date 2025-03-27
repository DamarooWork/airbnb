import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <section className="flex justify-center items-center flex-grow py-10">
      <SignIn />
    </section>
  )
}
