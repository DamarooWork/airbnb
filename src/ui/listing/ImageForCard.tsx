'use client'
import Image from 'next/image'
import { useState } from 'react'
import Loader from '../Loader'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import blurDataURL from '@/lib/utils/blurDataURL'
interface ImageForCardProps {
  imgAlt: string
  imgUrl: string | null
}
export default function ImageForCard({ imgAlt, imgUrl }: ImageForCardProps) {
  const { base64 } = blurDataURL()
  const [image, setImage] = useState<string>(
    imgUrl ? imgUrl : imagePlaceholder('500', imgAlt)
  )
  const [imageStatus, setImageStatus] = useState<
    'Loading' | 'Error' | 'Loaded'
  >('Loaded')
  if (imageStatus === 'Loading') return <Loader />
  return (
    <>
      <Image
        className="object-cover transition-transform duration-300 transform group-hover:scale-105 will-change-transform cursor-pointer"
        onLoad={() => setImageStatus('Loaded')}
        onError={() => setImage(imagePlaceholder('500', imgAlt))}
        src={image}
        alt={imgAlt}
        fill
        placeholder="blur"
        blurDataURL={base64}
        sizes="(max-width: 640px) 100vw 100vw, (max-width: 768px) 50vw 50vw, (max-width: 1280px) 33vw 33vw, (max-width: 1536px) 25vw 25vw, (max-width: 1920px) 20vw 20vw, 16vw 16vw"
      />
    </>
  )
}
