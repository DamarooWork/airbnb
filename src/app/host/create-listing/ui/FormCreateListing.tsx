import Input from './Input'
import { prisma } from '../../../../../db/prisma'
import { auth } from '@clerk/nextjs/server'

export default function FormCreateListing() {
  const submitListing = async (formData: FormData) => {
    'use server'
    const { userId } = await auth()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const price = formData.get('price') as string
    const image = formData.get('image') as string
    const createListing = await prisma.listing.create({
      data: {
        title,
        description,
        location,
        price: parseInt(price),
        image,
        ownerId: userId!,
      },
    })

    console.log(createListing)
  }
  return (
    <>
      <form
        className="flex flex-col w-[500px] gap-4 mt-8 border-2 border-purple-300 rounded-2xl bg-purple-100 p-4"
        action={submitListing}
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

        <button className="border-2 rounded-full py-2 px-4" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}
