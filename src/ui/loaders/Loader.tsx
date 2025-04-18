import { CSSProperties } from 'react'
import { CircleLoader } from 'react-spinners'
const override: CSSProperties = {
  display: 'block',
  margin: '20px auto',
}
interface LoaderProps {
  size?: number
}
export default function Loader({ size = 50 }: LoaderProps) {
  return (
    <section className="flex justify-center items-center ">
      <CircleLoader
        loading
        color="#ff385c"
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  )
}
