import Channelbar from './components/ChannelBar'
import ContentContainer from './components/ContentContainer'
import SideBar from './components/SideBar'
// import 'tailwindcss/dist/base.css'
// import 'tailwindcss/dist/components.css'
// import 'tailwindcss/dist/utilities.css'
// import useCreatePeer from './webrtc/useCreatePeer'
// import usePeerConnect from './webrtc/usePeerConnect'
// import { useStore } from './store'
// import SimplePeer from 'simple-peer'

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
