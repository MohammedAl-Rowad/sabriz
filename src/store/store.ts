import create, { GetState, SetState, StoreApi } from 'zustand'
import { RxDatabase } from 'rxdb'
import { Store } from './types'

export const useStore = create<
  Store,
  SetState<object>,
  GetState<Store>,
  StoreApi<any>
>((set) => ({
  codeEditorOpen: false,
  db: null,
  metaData: {},
  dataFromHost: {},
  setMetaData: (data: any) =>
    set((prevState: Store) => ({
      metaData: { ...prevState.metaData, ...data },
    })),
  setDataFromHost: (dataFromHost: any) =>
    set((prevState: Store) => ({
      dataFromHost: { ...prevState.dataFromHost, ...dataFromHost },
    })),
  setCodeEditorOpen: (f: boolean) => set({ codeEditorOpen: f }),
  setDB: (db: RxDatabase) => set({ db }),
}))
