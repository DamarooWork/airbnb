import { create } from 'zustand'

const InitialState = {
  location: '',
  dates: [new Date(), new Date()],
  guests: 0,
}

export const useSearchStore = create((set) => ({
  ...InitialState,
  increaseGuests: () =>
    set((state: { guests: number }) => ({ guests: state.guests + 1 })),
  decreaseGuests: () =>
    set((state: { guests: number }) => ({ guests: state.guests - 1 })),
  updateDates: () =>
    set((state: { dates: Date[] }) => ({
      dates: (state.dates = [new Date(), new Date()]),
    })),
  updateBears: (newBears: any) => set({ bears: newBears }),
}))
