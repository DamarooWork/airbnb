import { Listing } from '@prisma/client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
interface CardProps {
  listing: Listing
}
export default function Card({ listing }: CardProps) {
  const [image, setImage] = useState<string>(
    listing.image ? listing.image : imagePlaceholder
  )
  return (
    <li
      className="card justify-between gap-4 shadow-gray-300 shadow-xl p-4 text-xl transition-transform duration-300 ease-in-out group hover:scale-[1.02] will-change-transform "
      key={listing.id}
    >
      <Image
        className="object-cover transition-transform duration-300 transform group-hover:scale-[1.05] will-change-transform cursor-pointer -z-30 rounded-2xl opacity-90"
        onError={() => setImage(imagePlaceholder)}
        src={image}
        alt={listing.title}
        fill
      />
      <Link
        className="hover:underline p-1 text-black bg-white/80 w-fit rounded"
        href={`/rooms/${listing.id}`}
      >
        <h2 className="font-bold">{listing.title}</h2>
        <p className="text-gray-600">{listing.description}</p>
      </Link>
      <Link
        className="hover:underline p-1 text-black bg-white/80 w-fit rounded"
        href={`/host/listing/${listing.id}`}
      >
        Edit the listing
      </Link>
    </li>
  )
}
