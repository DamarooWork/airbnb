'use client'
import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { IListing } from '@/app/api/search/route'
import Image from 'next/image'
import { useAnimate } from 'framer-motion'
import { useReward } from 'react-rewards'
import Loader from '@/ui/Loader'
import { imageLoaderSrc } from '@/lib/constants/imageLoaderSrc'

const rewardConfigs = {
  lifetime: 100,
  spread: 90,
  decay: 0.8,
  elementCount: 12,
  elementSize: 10,
  emoji: ['❤️', '💖', '💝'],
}

export default function InfoCard({ listing }: { listing: IListing }) {
  const [isFav, setIsFav] = useState(false)
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
  return (
    <li className="w-full  shadow-md rounded-md overflow-hidden group cursor-pointer relative">
      <section className="relative w-full h-48 overflow-hidden">
        {imageStatus === 'Loading' && <Loader />}
        {imageStatus === 'Error' ? (
          <Image
            className="object-cover transition-transform duration-300 transform group-hover:scale-110 will-change-transform"
            src={imageLoaderSrc}
            alt={imageStatus}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536) 25vw, 20vw"
          />
        ) : (
          <Image
            className="object-cover transition-transform duration-300 transform group-hover:scale-110 will-change-transform"
            onLoad={() => setImageStatus('Loaded')}
            onError={() => setImageStatus('Error')}
            src={listing.image}
            alt={listing.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536) 25vw, 20vw"
          />
        )}
      </section>

      <section className="p-4">
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
        <button
          onClick={() => setIsFav((prev) => !prev)}
          className="absolute bottom-4 right-4  z-30"
        >
          <span id={`reward_${listing.id}`}>
            <HeartIcon className="text-primary w-5 h-5" />
          </span>
        </button>
        <div ref={scope} className="absolute bottom-4 right-4  z-20">
          <FilledHeartIcon className="text-primary w-5 h-5 scale-0" />
        </div>
      </section>
    </li>
  )
}
