import { CSSProperties } from 'react'
import { ClipLoader } from 'react-spinners'
const override: CSSProperties = {
  display: 'block',
  margin: '20px auto',
}
export default function Loader() {
  return (
    <section className="flex justify-center items-center ">
      <ClipLoader
        loading
        color="#ff385c"
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  )
}
