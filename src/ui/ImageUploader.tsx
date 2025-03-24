'use client'
import '@uploadthing/react/styles.css'
import { UploadDropzone } from '@/lib/utils/uploadthing'
import { toast } from 'react-toastify'
interface ImageUploaderProps {
  updateListingImageUrl: (fileUrl: string) => Promise<void>
}
export default function ImageUploader({
  updateListingImageUrl,
}: ImageUploaderProps) {
  return (
    <section className="flex flex-col w-full h-full items-center justify-center rounded-2xl  cursor-pointer">
      <UploadDropzone
        className={'w-full h-full'}
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          try {
            const fileUrl = res[0].ufsUrl
            if (fileUrl) {
              await updateListingImageUrl(fileUrl)
            }
          } catch (e) {
            console.log(e)
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
    </section>
  )
}
