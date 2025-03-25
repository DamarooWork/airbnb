'use client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import { useWindowSize } from '@uidotdev/usehooks'
import Image from 'next/image'
import { useState } from 'react'
interface ImageForCardProps {
  imgAlt: string
  imgUrl: string | null
  base64?: string
}
export default function ImageForCard({
  imgAlt,
  imgUrl,
  base64,
}: ImageForCardProps) {
  const { width } = useWindowSize()
  const [image, setImage] = useState<string>(
    imgUrl ? imgUrl : imagePlaceholder(`${width}x400`, imgAlt)
  )
  return (
    <Image
      className="object-cover rounded-2xl  "
      onError={() => setImage(imagePlaceholder(`${width}x400`, imgAlt))}
      src={image}
      alt={imgAlt}
      fill
      placeholder="blur"
      blurDataURL={base64}
      sizes="(max-width: 1500px) 100vw 400px, 1500px 400px"
    />
  )
}
