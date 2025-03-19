'use client'
import '@uploadthing/react/styles.css'
import { UploadButton } from '@/lib/utils/uploadthing'
import { toast } from 'react-toastify'
interface ImageUploaderProps {
  updateListingImageUrl: (fileUrl: string) => Promise<void>
}
export default function ImageUploader({
  updateListingImageUrl,
}: ImageUploaderProps) {
  return (
    <section className="flex flex-col h-full items-center justify-center rounded-2xl border-2">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          try {
            let fileUrl = res[0].ufsUrl
            if (fileUrl) {
              await updateListingImageUrl(fileUrl)
            }
            toast('Upload Completed!')
            
          } catch (e) {
            console.log(e)

            alert('Upload failed')
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </section>
  )
}
