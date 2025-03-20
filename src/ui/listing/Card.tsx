'use client'
import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import {
  HeartIcon as FilledHeartIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useAnimate } from 'framer-motion'
import { useReward } from 'react-rewards'
import Loader from '@/ui/Loader'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import { Listing } from '@prisma/client'
import Link from 'next/link'

const rewardConfigs = {
  lifetime: 100,
  spread: 90,
  decay: 0.8,
  elementCount: 12,
  elementSize: 10,
  emoji: ['❤️', '💖', '💝'],
}

export default function Card({ listing }: { listing: Listing }) {
  const [isFav, setIsFav] = useState(false)
  const [image, setImage] = useState<string>(
    listing.image ? listing.image : imagePlaceholder
  )
  const [scope, animate] = useAnimate()
  const [imageStatus, setImageStatus] = useState<
    'Loading' | 'Error' | 'Loaded'
  >('Loaded')
  const { reward } = useReward(`reward_${listing.id}`, 'emoji', rewardConfigs)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isFav) {
      animate(
        'svg',
        {
          scale: [0, 1],
        },
        {
          duration: 0.5,
          type: 'spring',
        }
      )
      timeoutId = setTimeout(() => reward(), 200)
    } else {
      animate(
        'svg',
        {
          scale: [1, 0],
        },
        {
          duration: 0.5,
          type: 'spring',
        }
      )
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isFav, animate, reward])
  const handleHeartClick = () => {
    setIsFav((prev) => !prev)
  }
  return (
    <li className="w-full overflow-hidden group relative">
      <Link
        title={listing.title}
        aria-label={listing.title}
        className="relative block w-full aspect-square overflow-hidden rounded-3xl"
        href={`/rooms/${listing.id}`}
      >
        {imageStatus === 'Loading' && <Loader />}
        <Image
          className="object-cover transition-transform duration-300 transform group-hover:scale-105 will-change-transform cursor-pointer"
          onLoad={() => setImageStatus('Loaded')}
          onError={() => setImage(imagePlaceholder)}
          src={image}
          alt={listing.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536) 25vw, 20vw"
        />
      </Link>
      <Link
        title={listing.title}
        aria-label={listing.title}
        href={`/rooms/${listing.id}`}
        className="pt-4 cursor-pointer block"
      >
        <header className="flex items-center justify-between text-xl leading-5">
          <h3 className="font-semibold max-w-[90%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {listing.title}
          </h3>
          <section className="flex justify-center gap-1 items-center ">
            <StarIcon className="h-5 w-5 text-primary" />
            <span className=" text-gray-800">
              {listing.rating ? listing.rating : 0}
            </span>
          </section>
        </header>

        <footer className="flex flex-col justify-between text-sm">
          <p className="text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {listing.description}
          </p>
          <p className="font-semibold">{listing.location}</p>
          <p className="text-base">
            <span className="font-semibold underline">{listing.price}$</span>
            <span className="text-gray-500"> for 1 night</span>
          </p>
        </footer>
      </Link>
      <button
        title="Add to favorites"
        onClick={handleHeartClick}
        className="absolute bottom-0  right-0 z-30"
      >
        <span id={`reward_${listing.id}`}>
          <HeartIcon className="text-primary hover:scale-110 transition-transform    w-6 h-auto" />
        </span>
      </button>
      <button
        title="Delete from favorites"
        onClick={handleHeartClick}
        ref={scope}
        className={`absolute bottom-0  right-0 ${isFav ? 'z-30' : 'z-20'} `}
      >
        <FilledHeartIcon className="text-primary w-6 h-auto scale-0 hover:scale-110 transition-transform" />
      </button>
    </li>
  )
}
