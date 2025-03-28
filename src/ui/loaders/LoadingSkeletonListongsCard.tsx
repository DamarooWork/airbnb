import Skeleton from 'react-loading-skeleton'

export default function LoadingSkeletonListongsCard() {
  return (
    <li className="relative">
      <Skeleton
        style={{ borderRadius: '30px' }}
        className=" aspect-square mb-2"
      />
      <Skeleton className="rounded-xl" count={2} />
      <Skeleton style={{ maxWidth: '40%' }} className="rounded-xl" count={1} />
      <Skeleton style={{ maxWidth: '40%' }} className="rounded-xl" count={1} />
      <Skeleton
        style={{ position: 'absolute', bottom: 25, right: 0 }}
        height={20}
        circle
        width={20}
      />
    </li>
  )
}
