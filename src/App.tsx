import { useMount } from 'react-use'
import Channelbar from './components/ChannelBar'
import ContentContainer from './components/ContentContainer'
import SideBar from './components/SideBar'
import 'tailwindcss/dist/base.css'
import 'tailwindcss/dist/components.css'
import 'tailwindcss/dist/utilities.css'
import { init } from './database'
import { MAIN_COLLECTION_SCHEMA } from './database/schema'
import { RxDatabase } from 'rxdb'
import { useStore, storeDB } from './store'
import { MAIN_COLLECTION } from './constants'

const App = () => {
  const setDB = useStore(storeDB)

  useMount(() => {
    init()
      .then((db: RxDatabase) => {
        setDB(db)
        db.addCollections({
          [MAIN_COLLECTION]: {
            schema: MAIN_COLLECTION_SCHEMA,
          },
        })
      })
      .catch(console.error)
  })

  return (
    <div className="flex">
      <SideBar />
      <Channelbar />
      <ContentContainer />
    </div>
  )
}

export default App
