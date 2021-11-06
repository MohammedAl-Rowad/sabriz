import { memo } from 'react'
import { useStore, dataFromHost } from '../../store'
import MarkDown from '../common/MarkDown'

const ChannelBar = () => {
  const allDataFromHost = useStore(dataFromHost)
  const markDown = allDataFromHost?.question?.markdown
  return (
    <div className="channel-bar shadow-lg h-screen w-full overflow-auto">
      <div className="channel-container">
        <MarkDown markdown={markDown} />
      </div>
    </div>
  )
}

export default memo(ChannelBar)
