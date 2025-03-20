import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center mt-[10vh]">
      <SignUp />
    </section>
  )
}
