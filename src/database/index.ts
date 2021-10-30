import pouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { createRxDatabase, getRxStoragePouch, addPouchPlugin } from 'rxdb'

addPouchPlugin(pouchdbAdapterIdb)

export const database = createRxDatabase({
    name: 'mydatabase',
    storage: getRxStoragePouch('idb'),
})
