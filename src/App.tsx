import Channelbar from './components/ChannelBar'
import ContentContainer from './components/ContentContainer'
import SideBar from './components/SideBar'
import 'tailwindcss/dist/base.css'
import 'tailwindcss/dist/components.css'
import 'tailwindcss/dist/utilities.css'

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <Channelbar />
      <ContentContainer />
    </div>
  )
}

export default App
