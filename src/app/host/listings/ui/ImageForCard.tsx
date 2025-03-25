'use client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import Image from 'next/image'
import { useState } from 'react'
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
  return (
    <Image
      className="object-cover transition-transform duration-300 transform group-hover:scale-[1.03] will-change-transform cursor-pointer -z-30 rounded-2xl opacity-90"
      onError={() => setImage(imagePlaceholder)}
      src={image}
      alt={imgAlt}
      fill
      priority
      placeholder="blur"
      blurDataURL={base64}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
    />
  )
}
