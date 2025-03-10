'use client'
import useFetch from '@/lib/hooks/fetch/useFetch'
import ResultsList from './results/components/ResultsList'
import { prisma } from '../../../db/prisma'

export default function Search() {
  const { data, isLoading } = useFetch()
  return <ResultsList data={data} isLoading={isLoading} />
}
