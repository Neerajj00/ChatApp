import { create } from 'zustand'

export const useTheme = create((set) => ({
    theme:"night",
    setTheme: (theme) => set({theme})
}))
