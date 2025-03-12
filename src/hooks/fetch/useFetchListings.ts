'use server'
import { prisma } from '../../../db/prisma'
import { Listing, useFetchProps } from './useGetListings'

export default async function useFetchListings({ params }: useFetchProps) {
  const res: Listing[] = await prisma.listing.findMany(params)
  return res
}
