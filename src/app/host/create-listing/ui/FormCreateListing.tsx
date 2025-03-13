'use client'
import Input from './Input'
import BtnSubmit from './BtnSubmit'
import actionFormCreateListing from '@/lib/utils/actionFormCreateListing'
import { useState } from 'react'

export default function FormCreateListing() {
  const [disabled, setDisabled] = useState(false)
  const handleSubmitForm = async (formData: FormData) => {
    try {
      setDisabled(true)
      await actionFormCreateListing(formData)
    } catch (e) {
      console.log(e)
    } finally {
      setDisabled(false)
    }
  }
  return (
    <>
      <form
        className="flex flex-col w-[80vw] max-w-[1000px] gap-4 mt-8 border-2 border-red-300 rounded-2xl  p-4"
        action={handleSubmitForm}
      >
        <Input placeholder="Place's title" name="title" required />
        <Input
          placeholder="Tell me about your place"
          name="description"
          textarea
        />
        <Input placeholder="Place's location" name="location" />
        <Input
          placeholder="How much it costs for a day?"
          name="price"
          type="number"
          required
        />
        <Input placeholder="Paste link to the image" name="image" />

        <BtnSubmit disabled={disabled} />
      </form>
    </>
  )
}
