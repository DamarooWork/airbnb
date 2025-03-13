'use client'
import { useRouter } from 'next/navigation'
interface buttonLinkProps {
  link: string
  text: string
}
export default function ButtonLink({ link, text }: buttonLinkProps) {
  const router = useRouter()
  return (
    <button
      className="text-6xl italic  font-bold p-10 cursor-pointer border-[4px] rounded-full text-purple-800 border-purple-800 hover:bg-purple-200 hover:scale-[1.02] hover:-translate-y-2 active:bg-purple-300 transition-all duration-300 ease-in-out active:scale-[0.98] will-change-transform text-center max-w-[95vw] max-sm:p-4"
      onClick={() => router.push(link)}
    >
      {text}
    </button>
  )
}
