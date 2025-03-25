'use client'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useAnimate } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReward } from 'react-rewards'

interface HeartBtnProps {
  listingId: number
}
const rewardConfigs = {
  lifetime: 100,
  spread: 90,
  decay: 0.8,
  elementCount: 12,
  elementSize: 10,
  emoji: ['❤️', '💖', '💝'],
}
export default function HeartBtn({ listingId }: HeartBtnProps) {
  const [isFav, setIsFav] = useState(false)

  const [scope, animate] = useAnimate()

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
  const handleHeartClick = () => {
    setIsFav((prev) => !prev)
  }
  return (
    <>
      <button
        title="Add to favorites"
        onClick={handleHeartClick}
        className="absolute bottom-0  right-0 z-30"
      >
        <span id={`reward_${listingId}`}>
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
    </>
  )
}
