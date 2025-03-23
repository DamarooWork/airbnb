import { Prisma } from "@prisma/client";
import { prisma } from "../../../../db/prisma"

export const bookingSelect = {
  id: true,
  startDate: true,
  endDate: true,
  listing: true
} satisfies Prisma.BookingSelect
interface ListProps {
  userId: string | null
}
export default async function List({ userId }: ListProps) {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId!,
    },
    include: {
      listing: true,
    },
  })


  
  return (
   <>
     
   </>
  )
}