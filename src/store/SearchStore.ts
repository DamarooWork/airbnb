import { create } from 'zustand'
export interface SearchState {
  location: string
  dates: [Date, Date]
  guests: number
  
}
export interface SearchAction {
  increaseGuests: ()=>void
  decreaseGuests: ()=>void
  updateDates: (startDate: Date, endDate: Date)=>void
}
const InitialState: SearchState = {
  location: '',
  dates: [new Date(), new Date()],
  guests: 0,
} 

export const useSearchStore = create<SearchState & SearchAction>((set) => ({
  ...InitialState,
  increaseGuests: () =>
    set((state: { guests: number }) => ({ guests: state.guests + 1 })),
  decreaseGuests: () =>
    set((state: { guests: number }) => ({ guests: state.guests - 1 })),
  updateDates: (startDate: Date, endDate: Date) =>
    set((state: { dates: [Date, Date] }) => ({
      dates: (state.dates = [startDate, endDate]),
    })),
}))
