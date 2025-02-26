import { IListing } from '../api/search/route'
import ResultsList from './results/components/resultsList'

export default async function Search() {
  const res = await fetch('http://localhost:3000/api/search')
  const data: IListing[] = await res.json()
  return <ResultsList data={data} />
}
