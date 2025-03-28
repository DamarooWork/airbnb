import 'react-loading-skeleton/dist/skeleton.css'
import LoadingSkeletonListongsCard from './LoadingSkeletonListongsCard'

export default function LoadingSkeletonListingList() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6  gap-4 sm:gap-8 mt-4">
      <LoadingSkeletonListongsCard />
      <LoadingSkeletonListongsCard />
      <LoadingSkeletonListongsCard />
      <LoadingSkeletonListongsCard />
      <LoadingSkeletonListongsCard />
      <LoadingSkeletonListongsCard />
    </ul>
  )
}
