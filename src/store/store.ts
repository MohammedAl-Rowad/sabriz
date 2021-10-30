import create from 'zustand'

export const useStore = create(set => ({
    codeEditorOpen: false,
    setCodeEditorOpen: (f: boolean) => set({ codeEditorOpen: f }),
}))