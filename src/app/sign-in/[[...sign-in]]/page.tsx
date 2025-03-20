import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <section className="flex justify-center items-center mt-[15vh]">
      <SignIn />
    </section>
  )
}
