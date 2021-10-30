import pouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { createRxDatabase, getRxStoragePouch, addPouchPlugin } from 'rxdb'
import { MAIN_COLLECTION } from '../constants'

addPouchPlugin(pouchdbAdapterIdb)

export const init = () => createRxDatabase({
    name: MAIN_COLLECTION,
    storage: getRxStoragePouch('idb'),
})
