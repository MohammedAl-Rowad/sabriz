import { RxDatabase } from "rxdb";

export interface Store {
    codeEditorOpen: boolean
    db: RxDatabase | null
    setDB: (db: RxDatabase) => void
    setCodeEditorOpen: (f: boolean) => void
}