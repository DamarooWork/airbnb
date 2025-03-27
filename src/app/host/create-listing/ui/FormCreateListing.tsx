'use client'
import Input from './Input'
import BtnSubmit from './BtnSubmit'
import actionFormCreateListing from '@/lib/actions/formCreateListing'
import { useState } from 'react'
import ImageUnput from './ImageUnput'
import { toast } from 'react-toastify'
import Image from 'next/image'
import actionDeleteUploadThingFile from '@/lib/actions/deleteUploadThingFile'
import { XMarkIcon } from '@heroicons/react/24/outline'
import blurDataURL from '@/lib/utils/blurDataURL'

export default function FormCreateListing() {
  const [disabled, setDisabled] = useState(true)
  const [imageUrl, setImageUrl] = useState<string>('')
  const { base64 } = blurDataURL()
  const handleSubmitForm = async (formData: FormData) => {
    setDisabled(true)
    try {
      await actionFormCreateListing(formData, imageUrl)
      toast.success('The listing was created!')
    } catch (e) {
      console.log(e)
    }
    setDisabled(false)
  }
  const handleImageUrl = async (fileUrl: string) => {
    setDisabled(true)
    if (imageUrl) {
      await actionDeleteUploadThingFile(imageUrl)
    }
    setImageUrl(fileUrl)
    if (fileUrl) setDisabled(false)
  }
  return (
    <>
      <form
        className="flex flex-col w-full gap-4 border-2 border-red-300 rounded-2xl p-4 max-w-[1500px] mx-auto"
        action={handleSubmitForm}
      >
        <Input placeholder="Place's title" name="title" required />
        <Input
          placeholder="Tell me about your place"
          name="description"
          textarea
          required
        />
        <Input placeholder="Place's location" name="location" required />
        <Input
          placeholder="How much it costs for a day?"
          name="price"
          type="number"
          required
        />
        <ImageUnput handleImageUrl={handleImageUrl} />
        {imageUrl && (
          <div className="relative size-36 -mt-2">
            <Image
              className="object-cover rounded "
              src={imageUrl}
              alt="Preview listing image"
              fill
              sizes="144px"
              placeholder="blur"
              blurDataURL={base64}
            />
            <XMarkIcon
              onClick={() => handleImageUrl('')}
              className="absolute top-1 right-1 size-8 text-primary cursor-pointer hover:bg-red-100/70 rounded-lg"
            />
          </div>
        )}

        <BtnSubmit disabled={disabled} title={'Create booking'} />
      </form>
    </>
  )
}
