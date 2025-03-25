'use client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import Image from 'next/image'
import { useState } from 'react'
import Loader from '../Loader'
interface ImageForCardProps {
  imgAlt: string
  imgUrl: string | null
  base64: string
}
export default function ImageForCard({
  imgAlt,
  imgUrl,
  base64,
}: ImageForCardProps) {
  const [image, setImage] = useState<string>(imgUrl ? imgUrl : imagePlaceholder)
  const [imageStatus, setImageStatus] = useState<
    'Loading' | 'Error' | 'Loaded'
  >('Loaded')
  return (
    <>
      {imageStatus === 'Loading' && <Loader />}
      <Image
        className="object-cover transition-transform duration-300 transform group-hover:scale-105 will-change-transform cursor-pointer"
        onLoad={() => setImageStatus('Loaded')}
        onError={() => setImage(imagePlaceholder)}
        src={image}
        alt={imgAlt}
        fill
        placeholder="blur"
        blurDataURL={base64}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, (max-width: 1920px) 20vw, 17vw"
      />
    </>
  )
}
