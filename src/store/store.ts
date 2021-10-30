import create, { GetState, SetState, StoreApi } from 'zustand'
import { RxDatabase } from 'rxdb'
import { Store } from './types'

export const useStore = create<Store, SetState<object>, GetState<Store>, StoreApi<any>>(set => ({
    codeEditorOpen: false,
    db: null,
    setCodeEditorOpen: (f: boolean) => set({ codeEditorOpen: f }),
    setDB: (db: RxDatabase) => set({ db }),
}))