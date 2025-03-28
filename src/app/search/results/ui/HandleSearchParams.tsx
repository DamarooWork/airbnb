'use client'

import { useSearchStore } from '@/store/SearchStore'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function HandleSearchParams() {
  const searchParams = useSearchParams()
  const locationParam = searchParams.get('location')
  const startdateParam = searchParams.get('startdate')
  const enddateParam = searchParams.get('enddate')
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  let start: string[] | Date = (startdateParam as unknown as string).split('.')
  start = new Date(+start[2], +start[1] - 1, +start[0])
  let end: string[] | Date = (enddateParam as unknown as string).split('.')
  end = new Date(+end[2], +end[1] - 1, +end[0])

  useEffect(() => {
    if (locationParam) {
      useSearchStore.setState({ location: locationParam as string })
    }
  }, [locationParam])
  useEffect(() => {
    if (startdateParam) {
      useSearchStore.setState({
        dates: [start, endDate],
      })
    }
  }, [startdateParam])
  useEffect(() => {
    if (enddateParam) {
      useSearchStore.setState({
        dates: [startDate, end],
      })
    }
  }, [enddateParam])
  return <></>
}
