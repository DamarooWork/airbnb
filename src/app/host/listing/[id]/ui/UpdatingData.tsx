'use client'
import { PaperAirplaneIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useClickAway } from 'react-use'

interface UpdatingDataProps {
  children: React.ReactNode
  type?: string
  param: string
  action: (data: string) => Promise<void>
}
export default function UpdatingData({
  children,
  type = 'text',
  param,
  action,
}: UpdatingDataProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const handleSubmitForm = async (formData: FormData) => {
    const data = formData.get(param) as string
    if (data) {
      try {
        await action(data)
        toast.success(`${param} successfully updated`)
      } catch (e) {
        console.log(e)
      }
    }
    setIsUpdating(false)
  }
  useClickAway(ref, () => {
    setIsUpdating(false)
  })
  return (
    <div className="flex gap-2 items-center">
      {isUpdating ? (
        <form ref={ref} className="relative" action={handleSubmitForm}>
          <input
            required
            className="bg-transparent text-black outline-none border-[1px] border-red-300 rounded-lg p-2 pr-8 text-xl  "
            type={type}
            name={param}
            id={param}
            placeholder={`New ${param}`}
          />
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2"
            type="submit"
          >
            <PaperAirplaneIcon
              title={`Send new ${param}`}
              className=" size-6 text-primary cursor-pointer"
            />
          </button>
        </form>
      ) : (
        <> {children}</>
      )}
      <PencilIcon
        onClick={() => setIsUpdating((prev) => !prev)}
        title={`Change ${param}`}
        className="size-6 min-w-6 min-h-6 text-primary cursor-pointer"
      />
    </div>
  )
}
