'use client'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useAnimate } from 'framer-motion'
import { useState, useEffect, useTransition } from 'react'
import { useReward } from 'react-rewards'
import actionCreateFavoriteListing from '@/lib/actions/createFavoriteListing'
import actionDeleteFavoriteListing from '@/lib/actions/deleteFavoriteListing'
import { FavoriteListing } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface HeartBtnProps {
  listingId: number
  isFavorite: FavoriteListing | null
}
const rewardConfigs = {
  lifetime: 100,
  spread: 90,
  decay: 0.8,
  elementCount: 12,
  elementSize: 10,
  emoji: ['❤️', '💖', '💝'],
}
export default function HeartBtn({ listingId, isFavorite }: HeartBtnProps) {
  const [isFav, setIsFav] = useState<FavoriteListing | null | boolean>(
    isFavorite
  )
  const [isPending, startTransition] = useTransition()
  const [scope, animate] = useAnimate()
  const pathname = usePathname()
  const { reward } = useReward(`reward_${listingId}`, 'emoji', rewardConfigs)
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

  const handleAddFavoriteListing = async () => {
    if (isFav) return
    startTransition(async () => {
      await actionCreateFavoriteListing(listingId)
        .then(() => {
          setIsFav(true)
        })
        .catch((e: Error) => {
          console.log(e)
        })
    })
  }
  const handleDeleteFavoriteListing = () => {
    if (!isFav) return
    startTransition(async () => {
      await actionDeleteFavoriteListing(listingId)
        .then(() => {
          setIsFav(false)
        })
        .catch((e: Error) => {
          console.log(e)
        })
    })
  }
  return (
    <>
      <button
        title="Add to favorites"
        disabled={isPending}
        onClick={handleAddFavoriteListing}
        className="absolute bottom-0  right-0 z-30"
      >
        <span id={`reward_${listingId}`}>
          <HeartIcon
            className={`text-primary hover:scale-110 transition-transform    w-6 h-auto ${
              isPending ? 'text-red-200' : 'text-primary'
            }`}
          />
        </span>
      </button>
      <button
        title="Delete from favorites"
        disabled={isPending}
        onClick={handleDeleteFavoriteListing}
        ref={scope}
        className={`absolute bottom-0  right-0 ${isFav ? 'z-30' : 'z-20'} `}
      >
        <FilledHeartIcon
          className={`text-primary w-6 h-auto scale-0 hover:scale-110 transition-transform ${
            isPending ? 'text-red-200' : 'text-primary'
          }`}
        />
      </button>
    </>
  )
}
