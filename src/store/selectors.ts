import { Store } from './types'

export const codeEditorFlagToggler = (store: Store) => store.setCodeEditorOpen

export const codeEditorIsOpen = (store: Store) => store.codeEditorOpen
