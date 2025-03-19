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
import { Listing } from '@/hooks/fetch/useGetListings'
import { useRouter } from 'next/navigation'

const rewardConfigs = {
  lifetime: 100,
  spread: 90,
  decay: 0.8,
  elementCount: 12,
  elementSize: 10,
  emoji: ['❤️', '💖', '💝'],
}

export default function Card({ listing }: { listing: Listing }) {
  const router = useRouter()
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
    <li className="w-full  overflow-hidden group relative">
      <section className="relative w-full aspect-square overflow-hidden rounded-md">
        {imageStatus === 'Loading' && <Loader />}
        <Image
          onClick={() => router.push(`/rooms/${listing.id}`)}
          className="object-cover transition-transform duration-300 transform group-hover:scale-105 will-change-transform cursor-pointer"
          onLoad={() => setImageStatus('Loaded')}
          onError={() => setImage(imagePlaceholder)}
          src={image}
          alt={listing.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536) 25vw, 20vw"
        />
      </section>
      <section
        onClick={() => router.push(`/rooms/${listing.id}`)}
        className="py-4 cursor-pointer min-h-20"
      >
        <header className="flex items-center justify-between mb-2 text-xl leading-5">
          <h3 className="font-semibold max-w-[90%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {listing.title}
          </h3>
          <section className="flex justify-center gap-1 items-center ">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className=" text-gray-800">
              {listing.rating ? listing.rating : 0}
            </span>
          </section>
        </header>

        <footer>
          <p className="text-gray-600 mb-4">{listing.description}</p>
        </footer>
      </section>
      <button
        onClick={handleHeartClick}
        className="absolute bottom-4 right-0 z-30"
      >
        <span id={`reward_${listing.id}`}>
          <HeartIcon className="text-primary w-5 h-5" />
        </span>
      </button>
      <div ref={scope} className="absolute bottom-4 right-0  z-20">
        <FilledHeartIcon className="text-primary w-5 h-5 scale-0" />
      </div>
    </li>
  )
}
