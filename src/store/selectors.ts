import { RxDatabase } from 'rxdb'
import { Store } from './types'

export const codeEditorFlagToggler = (store: Store) => store.setCodeEditorOpen

export const codeEditorIsOpen = (store: Store) => store.codeEditorOpen

export const storeDB = (store: Store) => store.setDB
export const getDB = (store: Store) => store.db

