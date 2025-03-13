import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-purple-100">
      <SignIn />
    </main>
  )
}
