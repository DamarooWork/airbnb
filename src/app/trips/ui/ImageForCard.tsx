'use client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import blurDataURL from '@/lib/utils/blurDataURL'
import Image from 'next/image'
import { useState } from 'react'
interface ImageForCardProps {
  imgAlt: string
  imgUrl: string | null
}
export default function ImageForCard({
  imgAlt,
  imgUrl,
}: ImageForCardProps) {
  const [image, setImage] = useState<string>(imgUrl ? imgUrl : imagePlaceholder)
  const { base64 } = blurDataURL()
  return (
    <Image
      className="object-cover rounded-l-2xl"
      onError={() => setImage(imagePlaceholder)}
      src={image}
      alt={imgAlt}
      fill
      placeholder='blur'
      blurDataURL={base64}
      sizes="(max-width: 640px) 192px 192px, 240px 240px"
    />
  )
}
