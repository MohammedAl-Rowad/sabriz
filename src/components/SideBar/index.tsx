import { useRef, useState } from 'react'
import { useBoolean } from 'react-use'
import { BsPlus, BsCodeSlash } from 'react-icons/bs'
import clsx from 'clsx'
import { FaFingerprint } from 'react-icons/fa'
import { AiOutlineDisconnect, AiOutlineClose, AiFillCode } from 'react-icons/ai'
import { DiHtml5Connectivity } from 'react-icons/di'
import {
  useStore,
  codeEditorFlagToggler,
  setDataFromHostFun,
  setMetaDataFunc,
} from '../../store'
import SimplePeer from 'simple-peer'
import useDarkMode from '../../hooks/useDarkMode'
import CodeAdder from './CodeAdder'
import CodeQuestionList from './CodeQuestionList'
import { SENDING_QUESTION, SIGNAL_CODE } from '../../constants'

const SideBar = () => {
  const [open, toggleOpen] = useBoolean(false)
  const [codeListOpen, toggleCodeListOpen] = useBoolean(false)
  const [codeAdderOpen, toogleCodeAdderOpen] = useBoolean(false)
  const [globalPeer, setPeer] = useState<SimplePeer.Instance | null>(null)
  const setCodeEditorOpen = useStore(codeEditorFlagToggler)
  const setDataFromHost = useStore(setDataFromHostFun)
  const setMetaData = useStore(setMetaDataFunc)
  const textareaRef = useRef()
  const [enabled] = useDarkMode()

  const onCodeEditorToggle = () => {
    toogleCodeAdderOpen()
    setCodeEditorOpen(!codeAdderOpen)
    toggleCodeListOpen(false)
  }

  const onCodeListToggle = () => {
    toogleCodeAdderOpen(false)
    setCodeEditorOpen(!codeListOpen)
    toggleCodeListOpen()
  }

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 h-screen flex flex-col bg-white dark:bg-gray-900 shadow-lg z-10',
        {
          'w-16': !open && !codeAdderOpen && !codeListOpen,
          'w-72': open && !codeAdderOpen && !codeListOpen,
          'w-screen': codeAdderOpen || codeListOpen,
        }
      )}
    >
      <section className={clsx({ hidden: codeAdderOpen || codeListOpen })}>
        {open ? (
          <div className="p-4">
            <div className="flex justify-end">
              <div
                className="sidebar-icon margin ml-0 mr-0"
                onClick={toggleOpen}
              >
                <AiOutlineClose size="28" />
              </div>
            </div>
            <textarea
              className={clsx(
                'appearance-none border-2 dark:bg-gray-900 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none',
                { 'text-white': enabled, 'text-black': !enabled }
              )}
              placeholder="Paste the offer here"
              rows={20}
              ref={textareaRef as any}
            />
            <div className="flex justify-end">
              <div
                className="sidebar-icon margin ml-0 mr-0"
                onClick={() => {
                  setMetaData({ peer: true })
                  const offer = (textareaRef.current as any)?.value as string

                  const peer = globalPeer
                    ? globalPeer
                    : new SimplePeer({
                        initiator: false,
                        trickle: false,
                      })
                  peer.signal(JSON.parse(offer))

                  if (!globalPeer) {
                    peer.on('error', (err) => console.log('error', err))
                    peer.on('signal', (data: any) => {
                      if (data.renegotiate || data.transceiverRequest) {
                        return
                      }
                      console.log('SIGNAL', JSON.stringify(data))
                    })

                    peer.on('connect', () => {
                      console.log('CONNECT')
                      // setInterval(() => {
                      // peer.send('whatever' + Math.random())
                      // peer.emit('DATA_FROM_PEER', 'whatever' + Math.random())
                      // }, 1000)
                    })

                    // document.addEventListener(
                    //   SIGNAL_CODE,
                    //   ({ detail }: CustomEventInit<any>) => {
                    //     peer.send(JSON.stringify(detail))
                    //     console.log(detail)
                    //   }
                    // )
                    peer.on('data', (data) => {
                      try {
                        const parsedData = JSON.parse(data)
                        setDataFromHost(parsedData)
                      } catch {}
                    })
                  }
                }}
              >
                <DiHtml5Connectivity />
              </div>
            </div>
          </div>
        ) : (
          <>
            <SideBarIcon
              icon={<FaFingerprint size="28" />}
              onClick={async () => {
                setMetaData({ host: true })
                const peer = new SimplePeer({
                  // channelName: id,
                  initiator: true,
                  trickle: false,
                })
                setPeer(peer as any)
                peer.on('error', (err) => console.log('error', err))
                peer.on('signal', (data: any) => {
                  if (data.renegotiate || data.transceiverRequest) {
                    return
                  }
                  console.log('SIGNAL', JSON.stringify(data))
                })

                peer.on('connect', () => {
                  console.log('CONNECT')
                  // setInterval(() => {
                  // peer.emit('DATA_FROM_HOST', '1')
                  // peer.send(`1`)
                  // }, 1000)
                })

                document.addEventListener(
                  SIGNAL_CODE,
                  ({ detail }: CustomEventInit<any>) => {
                    peer.send(
                      JSON.stringify({
                        question: detail.question,
                        type: SENDING_QUESTION,
                      })
                    )
                  }
                )

                peer.on('data', (data) => {
                  console.log('data: ' + data)
                })
              }}
              text="Click here to generate your id"
            />
            <Divider />
            <SideBarIcon
              text="Click here to join a room"
              onClick={toggleOpen}
              icon={<BsPlus size="32" />}
            />
            <SideBarIcon
              icon={<BsCodeSlash size="20" />}
              onClick={onCodeEditorToggle}
              text="Click here to add questions"
            />
            <SideBarIcon
              text="Click here to see your created and saved questions"
              onClick={onCodeListToggle}
              icon={<AiFillCode size="20" />}
            />
            <Divider />
            <SideBarIcon
              icon={<AiOutlineDisconnect size="22" />}
              text="Disconnect"
            />
          </>
        )}
      </section>
      {codeListOpen && <CodeQuestionList onCodeListToggle={onCodeListToggle} />}
      {codeAdderOpen && <CodeAdder toogleCodeAdderOpen={onCodeEditorToggle} />}
    </div>
  )
}

const SideBarIcon = ({ icon, text = 'tooltip 💡', onClick }: any) => (
  <div className="sidebar-icon group" onClick={onClick ? onClick : null}>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
)

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
