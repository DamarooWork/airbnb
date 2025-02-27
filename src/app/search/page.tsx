import { IListing } from '../api/search/route'
import InfoCard from './components/infoCard.tsx'
import ResultsList from './results/components/resultsList'

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/search')
  const data: IListing[] = await res.json()
  return (
    <ResultsList data={data}/>
  )
}
