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
import { Resizable } from 're-resizable'
import { useStore, storeDB } from './store'
import { MAIN_COLLECTION } from './constants'

export const style = {
  display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // border: 'solid 1px #ddd',
  // background: '#f0f0f0',
}
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
      <div className="w-full flex overflow-hidden">
        <Resizable
          style={style}
          defaultSize={{
            width: '50%',
            height: '100vh',
          }}
          maxWidth="90%"
          minWidth="20%"
        >
          <Channelbar />
        </Resizable>
        <div style={{ minWidth: 20 }} className="w-full">
          <ContentContainer />
        </div>
      </div>
    </div>
  )
}

export default App
