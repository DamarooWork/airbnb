'use server'
import { prisma } from '../../../db/prisma'
import { FetchProps, Listing } from './useGetListings'

export default async function FetchListings({ params }: FetchProps) {
  const res: Listing[] = await prisma.listing.findMany(params)
  return res
}
