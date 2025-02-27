'use client'

import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { IListing } from '@/app/api/search/route'
import Image from 'next/image'
export default function InfoCard({ listing }: { listing: IListing }) {
  const [] = useState()
  return (
    <li className=" max-w-md mx-auto shadow-md rounded-md overflow-hidden group cursor-pointer relative">
      <Image
        className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110 overflow-hidden"
        src={listing.image}
        alt={listing.name}
        width={1000}
        height={1000}
      />
      <section className=" p-4">
        <header className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-xl">{listing.name}</h3>
          <section className="flex justify-center gap-1 items-center">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className=" text-gray-800">{listing.rating}</span>
          </section>
        </header>

        <footer>
          <p className="text-gray-600 mb-4">{listing.description}</p>
        </footer>
        <button className="absolute bottom-4 right-4 p-2 -z-30">
          <HeartIcon className="text-primary w-5 h-5" />
        </button>
      </section>
    </li>
  )
}
