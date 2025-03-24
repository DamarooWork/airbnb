'use client'
import { UploadButton } from '@/lib/utils/uploadthing'
import { twMerge } from 'tailwind-merge'
interface ImageUnputProps {
  handleImageUrl: (fileUrl: string) => void
}
export default function ImageUnput({ handleImageUrl }: ImageUnputProps) {
  const buttonClass = `group relative flex justify-start h-10 min-w-full cursor-pointer  overflow-hidden rounded-md text-gray-400 after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 disabled:pointer-events-none data-[state=disabled]:cursor-not-allowed data-[state=readying]:cursor-not-allowed data-[state=disabled]:bg-red-400 data-[state=ready]:bg-white bg-transparent outline-none border-[1px] border-red-300 rounded-lg p-2 data-[state=readying]:bg-red-400 data-[state=uploading]:bg-red-400 after:absolute after:left-0 after:h-full after:w-[var(--progress-width)] after:content-[''] data-[state=uploading]:after:bg-red-600`
  return (
    <UploadButton
      config={{ cn: twMerge }}
      appearance={{
        button: buttonClass,
        container: 'flex flex-col-reverse justify-start items-start min-w-full',
        allowedContent: 'font-semibold text-primary text-base mb-2',
      }}
      endpoint={'imageUploader'}
      onClientUploadComplete={(res) => {
        try {
          const fileUrl = res[0].ufsUrl
          if (fileUrl) {
            handleImageUrl(fileUrl)
          }
        } catch (e) {
          console.log(e)
        }
      }}
      onUploadError={(e) => {
        console.log(e)
      }}
    />
  )
}
