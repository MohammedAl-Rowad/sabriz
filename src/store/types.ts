import { RxDatabase } from "rxdb";

export interface Store {
    codeEditorOpen: boolean
    dataFromHost: any
    metaData: any,
    setMetaData: (dataFromHost: any) => void
    setDataFromHost: (metaData: any) => void
    db: RxDatabase | null
    setDB: (db: RxDatabase) => void
    setCodeEditorOpen: (f: boolean) => void
}