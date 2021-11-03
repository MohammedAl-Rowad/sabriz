import { Store } from './types'

export const codeEditorFlagToggler = (store: Store) => store.setCodeEditorOpen

export const codeEditorIsOpen = (store: Store) => store.codeEditorOpen

export const storeDB = (store: Store) => store.setDB
export const getDB = (store: Store) => store.db
export const dataFromHost = (store: Store) => store.dataFromHost

export const setDataFromHostFun = (store: Store) => store.setDataFromHost

export const setMetaDataFunc = (store: Store) => store.setMetaData
export const getMetaData = (store: Store) => store.metaData

