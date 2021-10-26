import create from 'zustand'

export const useStore = create(set => ({
    id: null,
    connectToId: null,
    offer: null,
    setId: (s: string) => set({ id: s }),
    setOffer: (s: string) => set({ offer: s }),
    setConnectToId: (s: string) => set({ connectToId: s })
}))