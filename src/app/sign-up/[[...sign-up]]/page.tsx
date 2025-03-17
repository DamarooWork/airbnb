import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-purple-100">
      <SignUp />
    </main>
  )
}
