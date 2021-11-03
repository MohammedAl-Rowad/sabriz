import TopNavigation from '../TopNavigation'
import { BsPlusCircleFill } from 'react-icons/bs'
import clsx from 'clsx'
import { useStore, codeEditorIsOpen, dataFromHost } from '../../store'
import MarkDown from '../common/MarkDown'

const ContentContainer = () => {
  const codeEditorOpen = useStore(codeEditorIsOpen)
  const allDataFromHost = useStore(dataFromHost)
  const markDown = allDataFromHost?.question?.markdown

  return (
    <div className="content-container">
      <TopNavigation />
      <MarkDown markdown={markDown} />
      <div className={clsx({ 'h-screen': !codeEditorOpen })} />
      {/* <BottomBar /> */}
    </div>
  )
}

const BottomBar = () => (
  <div className="bottom-bar">
    <PlusIcon />
    <input
      type="text"
      placeholder="Enter message..."
      className="bottom-bar-input"
    />
  </div>
)

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
  />
)

export default ContentContainer
