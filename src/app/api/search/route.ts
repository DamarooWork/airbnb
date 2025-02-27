import { NextResponse } from 'next/server'

import listingData from '../../../lib/data/listingData.json'

export interface IListing {
  id: number
  name: string
  description: string
  image: string
  price: number
  rating: number
}
export async function GET(_req: IListing[]) {
  return NextResponse.json(listingData)
}
