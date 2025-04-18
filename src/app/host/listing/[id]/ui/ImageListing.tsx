'use client'
import { useState } from 'react'
import { ArrowDownTrayIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import ImageUploader from '@/ui/ImageUploader'
import { toast } from 'react-toastify'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import { useWindowSize } from '@uidotdev/usehooks'
import blurDataURL from '@/lib/utils/blurDataURL'
interface ImageListingProps {
  imgAlt: string
  imgUrl: string | null
  updateListingImageUrl: (fileUrl: string) => Promise<void>
}
export default function ImageListing({
  imgAlt,
  imgUrl,
  updateListingImageUrl,
}: ImageListingProps) {
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false)
  const { base64 } = blurDataURL()
  const { width } = useWindowSize()
  const [image, setImage] = useState<string>(
    imgUrl ? imgUrl : imagePlaceholder(`${width}x300`, imgAlt)
  )
  const handleUpdateListingImageUrl = async (fileUrl: string) => {
    await updateListingImageUrl(fileUrl)
    setIsImageUploaderOpen(false)
    toast.success('Main image updated!')
    setImage(fileUrl)
  }

  return (
    <div className="relative w-full max-h-[300px] h-[300px] rounded-2xl group ">
      {isImageUploaderOpen ? (
        <>
          <XCircleIcon
            onClick={() => setIsImageUploaderOpen(false)}
            className="w-12 h-auto absolute top-4 right-4 text-primary z-10 rounded cursor-pointer"
          />
          <ImageUploader updateListingImageUrl={handleUpdateListingImageUrl} />
        </>
      ) : (
        <>
          <Image
            className="object-cover rounded-2xl"
            onError={() => setImage(imagePlaceholder(`${width}x300`, imgAlt))}
            src={image}
            alt={imgAlt}
            fill
            placeholder="blur"
            blurDataURL={base64}
            sizes="(max-width: 1500px) 100vw 300px, 1500px 300px"
          />
          <div
            title="Upload new image"
            onClick={() => setIsImageUploaderOpen(true)}
            className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-black opacity-0 group-hover:opacity-100 flex justify-center items-center rounded-2xl cursor-pointer transition-opacity duration-500 ease-in-out"
          >
            <ArrowDownTrayIcon className="w-14 h-auto text-primary bg-white p-3 rounded-full " />
          </div>
        </>
      )}
    </div>
  )
}
