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
      className="object-cover rounded-l-2xl"
      onError={() => setImage(imagePlaceholder)}
      src={image}
      alt={imgAlt}
      fill
      priority
      placeholder="blur"
      blurDataURL={base64}
      sizes="(max-width: 640px) 192px 192px, 240px 240px"
    />
  )
}
