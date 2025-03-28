import Loader from '@/ui/loaders/Loader'
import { useAuth, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function AuthButton() {
  const { isLoaded, isSignedIn } = useAuth()
  if (isLoaded && isSignedIn)
    return (
      <UserButton
        appearance={{
          elements: { userButtonAvatarBox: 'w-12 h-auto' },
        }}
      />
    )
  if (!isLoaded) {
    return <Loader size={50} />
  }
  return (
    <section className=" flex flex-nowrap">
      <SignUpButton mode="redirect">
        <button className="px-2 text-white rounded bg-primary p-2">
          Sign Up
        </button>
      </SignUpButton>
      <SignInButton mode="redirect">
        <button className="px-2  rounded text-primary p-2">Sign In</button>
      </SignInButton>
    </section>
  )
}
