'use server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../db/prisma'
import { redirect } from 'next/navigation'
export default async function actionFormCreateListing(formData: FormData) {
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
  if (createListing) {
    redirect('/host/create-listing/success')
  }
}
